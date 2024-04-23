import React, { type ChangeEvent, useCallback, useRef } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnUploadButton, cnUploadButtonIcon, cnUploadButtonInput, cnUploadButtonText } from './UploadButton.classnames';
import type { UploadButtonProps } from './UploadButton.typings';

import UploadButtonIcon from './../../Assets/UploadButton.png';

import './UploadButton.scss';

export function UploadButton(props: UploadButtonProps) {
    const { addImages, className } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickHandler = useCallback(() => {
        inputRef.current.click();
    }, [inputRef]);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && addImages) {
            addImages(Array.from(e.target.files));
        }
    }, [addImages]);

    return (
        <>
            <button
                className={classnames(className, cnUploadButton)}
                onClick={onClickHandler}
            >
                <span
                    className={cnUploadButtonText}
                >ЗАГРУЗИТЬ</span>
                <img
                    className={cnUploadButtonIcon}
                    src={UploadButtonIcon}
                    draggable={false}
                />
            </button>
            <input
                className={cnUploadButtonInput}
                ref={inputRef}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </>
    );

}
