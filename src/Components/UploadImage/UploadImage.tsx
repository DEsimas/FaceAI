import React, { type ChangeEvent, useCallback, useRef } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnUploadImage, cnUploadImageButton, cnUploadImageContent, cnUploadImageIcon, cnUploadImageInput, cnUploadImageSpan, cnUploadImageText } from './UploadImage.classnames';
import type { UploadImageProps } from './UploadImage.typings';

import UploadButton from './../../Assets/UploadButton.png';

import './UploadImage.scss';

export function UploadImage(props: UploadImageProps) {
    const {addImages, className} = props;

    const inputRef = useRef<HTMLInputElement>(null);

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
            className={classnames(className, cnUploadImage)}
        >
            <div
                className={cnUploadImageContent}
            >
                <span
                    className={cnUploadImageText}
                >Для начала загрузите ваши изображения, можете просто перетащить их на страницу</span>
                <button
                    className={cnUploadImageButton}
                    onClick={onClickHandler}
                >
                    <span
                        className={cnUploadImageSpan}
                    >ЗАГРУЗИТЬ</span>
                    <img 
                        className={cnUploadImageIcon}
                        src={UploadButton}
                        draggable={false}
                    />
                </button>
            </div>
            <input
                className={cnUploadImageInput}
                ref={inputRef}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
}
