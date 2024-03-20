import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Button } from '../Button';
import { classnames } from '@bem-react/classnames';
import { cnFileInput, cnFileInputButton, cnFileInputInput } from './FileInput.classnames';
import type { FileInputProps } from './FileInput.typings';

import './FileInput.scss';

export function FileInput(props: FileInputProps) {
    const { addFiles, className, z_index } = props;

    const inputFile = useRef<HTMLInputElement | null>(null);

    const onClickHandler = useCallback(() => {
        inputFile.current.click();
    }, [inputFile]);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(e.target.files);
        }
    }, [addFiles]);

    return (
        <div
            className={classnames(cnFileInput, className)}
            style={{ zIndex: z_index }}
        >
            <Button
                className={cnFileInputButton}
                onClick={onClickHandler}
                text='Выбрать'
            />
            <input
                className={cnFileInputInput}
                ref={inputFile}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
} 
