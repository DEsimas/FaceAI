import React, { useCallback, useEffect, useState } from 'react';
import { useBus } from 'react-bus';
import { classnames } from '@bem-react/classnames';
import { v4 } from 'uuid';
import { ALLOWED_FILE_EXTENSIONS, MAXIMUM_AMOUNT_OF_SELECTED_FACES, MAXIMUM_FILE_SIZE_BYTES, USE_MOCK } from '../Constants';
import { isEqualFiles } from '../Utils/compareFiles';
import { singularOrPlural } from '../Utils/singularOrPlural';
import { getImageResolution } from '../Utils/getImageResolution';
import { mockSelectFaces } from '../Utils/mockSelectFaces';
import { Message } from '../Components/Message';
import { Header } from '../Components/Header';
import { MessageWrapper } from '../Components/MessageWrapper';
import { DragAndDrop } from '../Components/DragAndDrop';
import { Gallery } from '../Components/Gallery';
import { UploadButton } from '../Components/UploadButton';
import { Image } from '../Components/Image';
import { Table } from '../Components/Table';
import { ImageModal } from '../Components/ImageModal';
import { Widget } from '../Components/Widget';
import { selectFaces, uploadImages } from './App.server';
import { appWidgetCn, cnApp, cnAppDragAndDrop, cnAppGallery, cnAppHeader, cnAppUpload, cnAppWidget } from './App.classnames';
import type { ImageFiles, Error } from './App.typings';

import './App.scss';

export function App() {
    let imagesCounter = 0;

    const [images, setImages] = useState<ImageFiles>([]);
    const [table, setTable] = useState<number[][]>(mockSelectFaces().table);
    const [selectedCounter, setSelectedCounter] = useState(0);
    const [errors, setErrors] = useState<Error[]>([]);
    const [modalImageId, setModalImageId] = useState<string | null>(null);

    const bus = useBus();

    useEffect(() => {
        if (imagesCounter !== images.length) {
            imagesCounter = images.length;
            bus.emit('amountOfImagesChanged');
        }
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
            addError(`${singularOrPlural(tooLargeNames.length > 1, ['Файл', 'Файлы'])} ${tooLargeNames.join(', ')} слишком ${singularOrPlural(tooLargeNames.length > 1, ['большой', 'большие'])}. Максимальный размер файла ${Math.floor(MAXIMUM_FILE_SIZE_BYTES/100000)/10} мб.`);
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
        filteredImages.forEach(image => {
            uploadImages([image], USE_MOCK)
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
                .catch(() => {
                    const failedId = image.localId;
                    setImages(images => {
                        return images.filter(image => image.localId !== failedId);
                    });
                    addError('Ошибка сервера. Попробуйте позже');
                });
        });
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

    const fullscreenImage = useCallback((id: string) => {
        setModalImageId(id);
    }, []);

    return (
        <div className={cnApp}>
            {modalImageId ?
                <ImageModal
                    selectedCounter={selectedCounter}
                    selectFace={(index: number) => selectFace(images.find(img => img.localId === modalImageId).localId, index)}
                    image={images.find(img => img.localId === modalImageId)}
                    onClose={() => setModalImageId(null)}
                /> : null}
            <MessageWrapper>
                {errors.map(error => <Message
                    key={error.id}
                    text={error.text}
                    onClose={() => removeError(error.id)} />
                )}
            </MessageWrapper>
            <Header
                isLoaded={Boolean(images.length)}
                className={cnAppHeader}
            />
            {images.length ? <Gallery
                className={cnAppGallery}
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
                                fullscreenImage={() => fullscreenImage(image.localId)}
                                isLoading={image.serverId === undefined}
                            />
                        })),
                        {
                            id: 'upload',
                            width: 800,
                            height: 800,
                            element: <UploadButton addImages={addImages} />
                        }
                    ]}
            /> : <div className={cnAppUpload}>
                <UploadButton
                    addImages={addImages}
                />
            </div>}
            <Widget selectedCounter={selectedCounter} className={classnames(cnAppWidget, appWidgetCn({ isShown: selectedCounter >= 2 }))}>
                <Table images={images.filter(image => image.selectedIndexes.length !== 0)} table={table} />
            </Widget>
            <DragAndDrop
                className={cnAppDragAndDrop}
                addImages={addImages}
            />
        </div>
    );
}
