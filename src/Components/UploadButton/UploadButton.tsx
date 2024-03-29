import React, { useCallback, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnUploadButton, cnUploadButtonDisabled, cnUploadButtonImage } from './UploadButton.classnames';
import type { UploadButtonProps } from './UploadButton.typings';

import Upload from './../../Assets/Upload.png';

import './UploadButton.scss';

export function UploadButton(props: UploadButtonProps) {
    const { addImages, className } = props;

    const inputRef = useRef<HTMLInputElement>();

    const onClickHandler = useCallback(() => {
        inputRef.current.click();
    }, [inputRef]);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addImages(Array.from(e.target.files));
        }
    }, [addImages]);

    return (
        <div
            className={classnames(cnUploadButton, className)}
            onClick={onClickHandler}
        >
            <img
                className={cnUploadButtonImage}
                alt='Загрузгить изображение'
                src={Upload}
            />
            <input
                className={cnUploadButtonDisabled}
                ref={inputRef}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
}
