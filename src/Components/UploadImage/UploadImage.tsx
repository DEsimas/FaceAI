import React, { useCallback, useRef, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnUploadImage, cnUploadImageDisabled, cnUploadImageImage } from './UploadImage.classnames';
import type { UploadImageProps } from './UploadImage.typings';

import Upload from './../../Assets/Upload.png';

import './UploadImage.scss';

export function UploadImage(props: UploadImageProps) {
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
            className={classnames(cnUploadImage, className)}
            onClick={onClickHandler}
            ref={elementRef}
        >
            <img
                className={cnUploadImageImage}
                alt='Загрузгить изображение'
                src={Upload}
                style={{ padding: `${padding}px` }}
                draggable={false}
            />
            <input
                className={cnUploadImageDisabled}
                ref={inputRef}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
}
