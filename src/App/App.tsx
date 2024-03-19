import React, { useCallback, useState } from 'react';
import { ALLOWED_FILE_EXTENSIONS, MAXIMUM_FILE_SIZE_BYTES } from '../Constants';
import { isEqualFiles } from '../Utils/compareFiles';
import { LoadSection } from '../Components/LoadSection';
import { SelectSection } from '../Components/SelectSection';
import { TableSection } from '../Components/TableSection/TableSection';
import { selectFaces, uploadImages } from './App.server';
import { cnApp, cnAppHeader, cnAppLoad, cnAppSelect, cnAppTable } from './App.classnames';
import type { Table, ImageFiles } from './App.typings';

import './App.scss';

export function App() {
    const [images, setImages] = useState<ImageFiles>([]);
    const [table, setTable] = useState<Table | undefined>(undefined);

    const addImages = useCallback(async (newImages: ImageFiles) => {
        const duplicatesNames: string[] = [];
        const tooLargeNames: string[] = [];
        const wrongExtensionNames: string[] = [];
        for (let i = 0; i < newImages.length; i++) {
            const newImage = newImages[i];
            if (!ALLOWED_FILE_EXTENSIONS.includes(newImage.file.name.split('.').reverse()[0])) {
                wrongExtensionNames.push(newImage.file.name);
                newImages.splice(i, 1);
                i--;
            }
            if (newImage.file.size > MAXIMUM_FILE_SIZE_BYTES) {
                tooLargeNames.push(newImage.file.name);
                newImages.splice(i, 1);
                i--;
            }
            for (const oldImage of images) {
                if (await isEqualFiles(newImage.file, oldImage.file)) {
                    duplicatesNames.push(newImage.file.name);
                    newImages.splice(i, 1);
                    i--;
                }
            }
        }
        if (duplicatesNames.length !== 0) {
            alert(duplicatesNames.join(', ') + ' уже загружены');
        }
        if (tooLargeNames.length !== 0) {
            alert(tooLargeNames.join(', ') + ' слишком большие');
        }
        if (wrongExtensionNames.length !== 0) {
            alert(wrongExtensionNames.join(', ') + ' неверный формат');
        }
        setImages([...images, ...newImages]);
        uploadImages(newImages)
            .then((response) => {
                setImages(images => {
                    for (const facesData of response) {
                        const image = images.find(image => image.localId === facesData.localId);
                        image.serverId = facesData.serverId;
                        image.faces = facesData.faces;
                    }
                    return [...images];
                })
            });
    }, [images]);

    const removeImage = useCallback((id: string) => {
        setImages(images => {
            return images.filter(image => image.localId !== id);
        });
    }, []);

    const selectFace = useCallback((id: string, index: number) => {
        setImages(images => {
            const image = images.find(image => image.localId === id);
            const indexOf = image.selectedIndexes.indexOf(index);
            if (indexOf === -1)
                image.selectedIndexes.push(index);
            else
                image.selectedIndexes.splice(indexOf, 1);
            const selectedImages = images.filter(image => image.selectedIndexes.length !== 0);
            selectFaces(selectedImages)
                .then(table => setTable(table));
            return [...images];
        });
    }, []);


    return (
        <div className={cnApp}>
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
                < SelectSection
                    className={cnAppSelect}
                    images={images}
                    selectFace={selectFace}
                /> : null}
            {table?.names.length > 1 ?
                <TableSection
                    className={cnAppTable}
                    table={table}
                /> : null}
        </div>
    );
}