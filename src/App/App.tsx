import React, { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { ALLOWED_FILE_EXTENSIONS, MAXIMUM_AMOUNT_OF_SELECTED_FACES, MAXIMUM_FILE_SIZE_BYTES, USE_MOCK } from '../Constants';
import { isEqualFiles } from '../Utils/compareFiles';
import { singularOrPlural } from '../Utils/singularOrPlural';
import { getImageResolution } from '../Utils/getImageResolution';
import { Counter } from '../Components/Counter';
import { Message } from '../Components/Message';
import { MessageWrapper } from '../Components/MessageWrapper';
import { DragAndDrop } from '../Components/DragAndDrop';
import { Gallery } from '../Components/Gallery';
import { selectFaces, uploadImages } from './App.server';
import { cnApp, cnAppCounter, cnAppDragAndDrop, cnAppHeader, cnAppSpan, cnAppUpload } from './App.classnames';
import type { ImageFiles, Error } from './App.typings';

import './App.scss';
import { UploadButton } from '../Components/UploadButton';
import { Image } from '../Components/Image';
import { Table } from '../Components/Table';

export function App() {
    const [images, setImages] = useState<ImageFiles>([]);
    const [table, setTable] = useState<number[][]>([]);
    const [selectedCounter, setSelectedCounter] = useState(0);
    const [errors, setErrors] = useState<Error[]>([]);

    useEffect(() => {
        selectFaces(images, USE_MOCK)
            .then(res => setTable(res.table))
            .catch(() => addError('Ошибка сервера. Попробуйте позже'));
    }, [images]);

    const addImages = useCallback(async (newImages: File[]) => {
        const duplicatesNames: string[] = [];
        const tooLargeNames: string[] = [];
        const wrongExtensionNames: string[] = [];
        for (let i = 0; i < newImages.length; i++) {
            const newImage = newImages[i];
            if (!newImage) {
                break;
            }
            if (!ALLOWED_FILE_EXTENSIONS.includes(newImage.name.split('.').reverse()[0])) {
                wrongExtensionNames.push(newImage.name);
                newImages.splice(i, 1);
                i--;
            }
            if (newImage.size > MAXIMUM_FILE_SIZE_BYTES) {
                tooLargeNames.push(newImage.name);
                newImages.splice(i, 1);
                i--;
            }
            for (let j = i + 1; j < newImages.length; j++) {
                if (await isEqualFiles(newImage, newImages[j])) {
                    duplicatesNames.push(newImages[j].name);
                    newImages.splice(j, 1);
                    j--;
                }
            }
            for (const oldImage of images) {
                if (await isEqualFiles(newImage, oldImage.file)) {
                    duplicatesNames.push(newImage.name);
                    newImages.splice(i, 1);
                    i--;
                }
            }
        }
        if (duplicatesNames.length !== 0) {
            addError(`${singularOrPlural(duplicatesNames.length > 1, ['Файл', 'Файлы'])} ${duplicatesNames.join(', ')} уже ${singularOrPlural(duplicatesNames.length > 1, ['загружен', 'загружены'])}`);
        }
        if (tooLargeNames.length !== 0) {
            addError(`${singularOrPlural(tooLargeNames.length > 1, ['Файл', 'Файлы'])} ${tooLargeNames.join(', ')} слишком ${singularOrPlural(tooLargeNames.length > 1, ['большой', 'большие'])}`);
        }
        if (wrongExtensionNames.length !== 0) {
            addError(`${singularOrPlural(wrongExtensionNames.length > 1, ['Файл', 'Файлы'])} ${wrongExtensionNames.join(', ')} в неподдерживаемом формате`);
        }
        const filteredImages: ImageFiles = await Promise.all(newImages.map(async (file: File) => {
            const url = URL.createObjectURL(file);
            return {
                file: file,
                localId: v4(),
                url: url,
                resolution: await getImageResolution(url),
                selectedIndexes: []
            };
        }));
        setImages((images) => [...images, ...filteredImages]);
        uploadImages(filteredImages, USE_MOCK)
            .then((response) => {
                setImages(images => {
                    for (const facesData of response) {
                        const image = images.find(image => image.localId === facesData.localId);
                        image.serverId = facesData.serverId;
                        image.faces = facesData.faces;
                    }
                    return [...images];
                });
            })
            .catch(() => addError('Ошибка сервера. Попробуйте позже'));
    }, [images]);

    const removeImage = useCallback((id: string) => {
        setImages(images => {
            const image = images.find(image => image.localId === id);
            setSelectedCounter(ctr => ctr - image.selectedIndexes.length);
            return images.filter(image => image.localId !== id);
        });
    }, []);

    const selectFace = useCallback((id: string, index: number) => {
        setImages(images => {
            const image = images.find(image => image.localId === id);
            const indexOf = image.selectedIndexes.indexOf(index);
            if (indexOf === -1) {
                image.selectedIndexes.push(index);
                image.selectedIndexes.sort();
                setSelectedCounter(ctr => ++ctr);
            } else {
                image.selectedIndexes.splice(indexOf, 1);
                setSelectedCounter(ctr => --ctr);
            }
            return [...images];
        });
    }, []);

    const addError = useCallback((text: string) => {
        setErrors(errors => {
            errors.push({
                id: v4(),
                text
            });
            return [...errors];
        });
    }, []);

    const removeError = useCallback((id: string) => {
        setErrors(errors => errors.filter(error => error.id !== id));
    }, []);

    return (
        <div className={cnApp}>
            {selectedCounter ?
                <Counter
                    className={cnAppCounter}
                    value={selectedCounter}
                    max={MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                /> : null}
            <MessageWrapper>
                {errors.map(error => <Message
                    key={error.id}
                    text={error.text}
                    onClose={() => removeError(error.id)} />
                )}
            </MessageWrapper>
            <h1 className={cnAppHeader}>
                FaceAI
            </h1>
            <p className={cnAppSpan}>Перетащите фотографии для загрузки</p>
            {images.length ? <Gallery
                items={
                    [
                        ...images.map(image => ({
                            id: image.localId,
                            width: image.resolution.width,
                            height: image.resolution.height,
                            element: <Image
                                selectedIndexes={[...image.selectedIndexes]}
                                image={image}
                                removeImage={() => removeImage(image.localId)}
                                selectFace={(index) => selectFace(image.localId, index)}
                                key={image.localId}
                                disabled={selectedCounter >= MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                            />
                        })),
                        {
                            id: 'upload',
                            width: 980,
                            height: 980,
                            element: <UploadButton addImages={addImages} />,
                        }
                    ]}
            /> : <div className={cnAppUpload}>
                <UploadButton
                    addImages={addImages}
                />
            </div>}
            {selectedCounter >= 2 ? <Table images={images.filter(image => image.selectedIndexes.length !== 0)} table={table} /> : null}
            <DragAndDrop
                className={cnAppDragAndDrop}
                addImages={addImages}
            />
        </div>
    );
}
