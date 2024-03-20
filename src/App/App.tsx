import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import { ALLOWED_FILE_EXTENSIONS, MAXIMUM_AMOUNT_OF_SELECTED_FACES, MAXIMUM_FILE_SIZE_BYTES } from '../Constants';
import { isEqualFiles } from '../Utils/compareFiles';
import { singularOrPlural } from '../Utils/singularOrPlural';
import { getImageResolution } from '../Utils/getImageResolution';
import { Counter } from '../Components/Counter';
import { Message } from '../Components/Message';
import { LoadSection } from '../Components/LoadSection';
import { SelectSection } from '../Components/SelectSection';
import { MessageWrapper } from '../Components/MessageWrapper';
import { TableSection } from '../Components/TableSection/TableSection';
import { selectFaces, uploadImages } from './App.server';
import { cnApp, cnAppCounter, cnAppHeader, cnAppLoad, cnAppSelect, cnAppTable } from './App.classnames';
import type { ImageFiles, Error, SelectFacesResponse } from './App.typings';

import './App.scss';

export function App() {
    const [images, setImages] = useState<ImageFiles>([]);
    const [table, setTable] = useState<SelectFacesResponse | undefined>(undefined);
    const [selectedCounter, setSelectedCounter] = useState(0);
    const [errors, setErrors] = useState<Error[]>([]);

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
        setImages([...images, ...filteredImages]);
        uploadImages(filteredImages)
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
            if (image) {
                setSelectedCounter(ctr => ctr - image.selectedIndexes.length);
                const selectedImages = images.filter(image => image.selectedIndexes.length !== 0 && image.localId !== id);
                selectFaces(selectedImages)
                    .then(table => setTable(table))
                    .catch(() => addError('Ошибка сервера. Попробуйте позже'));

            }
            return images.filter(image => image.localId !== id);
        });
    }, []);

    const selectFace = useCallback((id: string, index: number) => {
        setImages(images => {
            const image = images.find(image => image.localId === id);
            const indexOf = image.selectedIndexes.indexOf(index);
            if (indexOf === -1) {
                image.selectedIndexes.push(index);
                setSelectedCounter(ctr => ++ctr);
            } else {
                image.selectedIndexes.splice(indexOf, 1);
                setSelectedCounter(ctr => --ctr);
            }
            image.selectedIndexes.sort();
            const selectedImages = images.filter(image => image.selectedIndexes.length !== 0);
            selectFaces(selectedImages)
                .then(table => setTable(table))
                .catch(() => addError('Ошибка сервера. Попробуйте позже'));
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
            <LoadSection
                className={cnAppLoad}
                images={images}
                addImages={addImages}
                removeImage={removeImage}
            />
            {images.length !== 0 ?
                <SelectSection
                    className={cnAppSelect}
                    images={images}
                    selectFace={selectFace}
                    disabled={selectedCounter >= MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                /> : null}
            {table?.table.length > 1 ?
                <TableSection
                    className={cnAppTable}
                    images={table.images}
                    table={table.table}
                /> : null}
        </div>
    );
}
