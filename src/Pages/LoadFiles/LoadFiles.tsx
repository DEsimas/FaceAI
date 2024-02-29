import React, { useCallback, useState, MouseEvent } from 'react';
import { DragAndDropZone } from '../../Components/DragAndDropZone';
import { Header } from '../../Components/Header';
import { Button } from '../../Components/Button';
import { Message } from '../../Components/Message';
import { MessageWrapper } from '../../Components/MessageWrapper';
import { fetchCoordinates } from './LoadFiles.server';
import { cnLoadFiles, cnLoadFilesButton, cnLoadFilesDADZone } from './LoadFiles.classnames';
import type { LoadFilesProps, PageError } from './LoadFiles.typings';

import './LoadFiles.scss';

const MAXIMUM_AMOUNT_OF_FILES = 10;
const MAXIMUM_FILE_SIZE_BYTES = 268435456;

export function LoadFiles(props: LoadFilesProps) {
    const { nextStage, files: initFiles } = props;

    const [files, setFiles] = useState<File[]>(initFiles);
    const [errors, setErrors] = useState<PageError[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const onClickHandler = useCallback(() => {
        if (files.length < 2)
            return addError('Выберите хотя бы два изображения');
        setIsLoading(true);
        fetchCoordinates(files)
            .then(response => nextStage(response))
            .catch(() => addError('У нас произодша ошибка, попробуйте позже'))
            .finally(() => setIsLoading(false));
    }, [files]);

    const addFiles = useCallback((filesList: FileList) => {
        if (files.length + filesList.length > MAXIMUM_AMOUNT_OF_FILES)
            return addError(`Максимальное количество изображений для загрузки ${MAXIMUM_AMOUNT_OF_FILES}`);
        setFiles((prev: File[]) => {
            const n = [...prev]
            for (const file of filesList) {
                if (file.size > MAXIMUM_FILE_SIZE_BYTES) {
                    addError(`${file.name}: Максимальный размер одного файла 64 мегабайта`);
                    continue;
                }
                if (n.find(elem => (elem.name === file.name))) {
                    addError(`${file.name} уже выбран`);
                    continue;
                }
                n.push(file);
            }
            return n;
        });
    }, [setFiles, files]);

    const removeFile = useCallback((path: string) => {
        setFiles((prev) => {
            const n = [...prev];
            return n.filter(file => file.name !== path)
        });
    }, [setFiles]);

    const removeError = useCallback((id: string) => {
        setErrors((prev) => {
            const n = [...prev]
            return n.filter((err) => err.id !== id);
        });
    }, [setErrors]);

    const addError = useCallback((message: string) => {
        setErrors(prev => {
            const n = [...prev];
            n.push({
                id: Date.now().toString(),
                text: message
            });
            return n;
        });
    }, [setErrors]);

    return (
        <div
            className={cnLoadFiles}
        >
            <Header
                text='Загрузите фотографии лиц для сравнения'
            />
            <DragAndDropZone
                className={cnLoadFilesDADZone}
                files={files}
                removeFile={removeFile}
                addFiles={addFiles}
                addError={addError}
            />
            <Button
                className={cnLoadFilesButton}
                text='Загрузить'
                onClick={onClickHandler}
                isLoading={isLoading}
            />
            <MessageWrapper>
                {errors.map(error => <Message
                    text={error.text}
                    onClose={() => removeError(error.id)}
                    key={error.id}
                />)}
            </MessageWrapper>
        </div>
    );
}