import React, { type ChangeEvent, useCallback, useRef } from 'react';
import type { UploadPageProps } from './UploadPage.typings';
import { classnames } from '@bem-react/classnames';
import { cnUploadPage, cnUploadPageButton, cnUploadPageContent, cnUploadPageIcon, cnUploadPageInput, cnUploadPageSpan, cnUploadPageText } from './UploadPage.classnames';

import UploadButton from './../../Assets/UploadButton.png';

import './UploadPage.scss';

export function UploadPage(props: UploadPageProps) {
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
            className={classnames(className, cnUploadPage)}
        >
            <div
                className={cnUploadPageContent}
            >
                <span
                    className={cnUploadPageText}
                >Для начала загрузите ваши изображения, можете просто перетащить их на страницу</span>
                <button
                    className={cnUploadPageButton}
                    onClick={onClickHandler}
                >
                    <span
                        className={cnUploadPageSpan}
                    >ЗАГРУЗИТЬ</span>
                    <img 
                        className={cnUploadPageIcon}
                        src={UploadButton}
                    />
                </button>
            </div>
            <input
                className={cnUploadPageInput}
                ref={inputRef}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
}
