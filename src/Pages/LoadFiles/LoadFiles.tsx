import React, { useCallback, useState, MouseEvent } from 'react';
import { DragAndDropZone } from '../../Components/DragAndDropZone';
import { Header } from '../../Components/Header';
import { Button } from '../../Components/Button';
import { fetchCoordinates } from './LoadFiles.server';
import { cnLoadFilesButton, cnLoadFilesDADZone } from './LoadFiles.classnames';
import type { LoadFilesProps } from './LoadFiles.typings';

import './LoadFiles.scss';

export function LoadFiles(props: LoadFilesProps) {
    const { nextStage, files: initFiles } = props;

    const [files, setFiles] = useState<File[]>(initFiles);

    const onClickHandler = useCallback(() => {
        fetchCoordinates(files)
            .then(response => nextStage(response));
    }, [files]);

    const addFiles = useCallback((filesList: FileList) => {
        setFiles((prev: File[]) => {
            for (const file of filesList) {
                if (!prev.find(elem => elem.name === file.name))
                    prev.push(file);
            }
            return prev;
        });
    }, [setFiles]);

    const removeFile = useCallback((path: string) => {
        setFiles((prev) => prev.filter(file => file.name !== path));
    }, [setFiles]);

    return (
        <div>
            <Header
                text='Загрузите фотографии лиц для сравнения'
            />
            <DragAndDropZone
                className={cnLoadFilesDADZone}
                files={files}
                removeFile={removeFile}
                addFiles={addFiles}
            />
            <Button
                className={cnLoadFilesButton}
                text='Загрузить'
                onClick={onClickHandler}
            />
        </div>
    );
}