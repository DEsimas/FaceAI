import React, { useCallback, useRef, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnUploadButton, cnUploadButtonDisabled, cnUploadButtonImage } from './UploadButton.classnames';
import type { UploadButtonProps } from './UploadButton.typings';

import Upload from './../../Assets/Upload.png';

import './UploadButton.scss';

export function UploadButton(props: UploadButtonProps) {
    const { addImages, className } = props;

    const inputRef = useRef<HTMLInputElement>();
    const elementRef = useRef<HTMLDivElement>();

    const [padding, setPadding] = useState<number>(0);

    useEffect(() => {
        setPadding((elementRef.current.clientWidth - 200) / 2);

        const resizeObserver = new ResizeObserver(() => elementRef.current && setPadding((elementRef.current.clientWidth - 200) / 2));
        resizeObserver.observe(elementRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

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
            ref={elementRef}
        >
            <img
                className={cnUploadButtonImage}
                alt='Загрузгить изображение'
                src={Upload}
                style={{ padding: `${padding}px` }}
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
