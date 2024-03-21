import React, { useCallback, useEffect, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnImageViewer, cnImageViewerButton, cnImageViewerImageArea, cnImageViewerItem } from './ImageViewer.classnames';
import type { ImageViewerProps } from './ImageViewer.typings';

import './ImageViewer.scss';
import { FilesListItem } from '../FilesListItem';

export function ImageViewer(props: ImageViewerProps) {
    const { images, selectFace, className, disabled } = props;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if(images.length === index) {
            setIndex(index-1);
        }
    }, [images]);

    const next = useCallback(() => {
        setIndex(index => {
            return index + 1 >= images.length ? images.length - 1 : index + 1;
        });
    }, [images]);

    const prev = useCallback(() => {
        setIndex(index => {
            return index - 1 < 0 ? 0 : index - 1;
        });
    }, []);

    return (
        <div className={classnames(cnImageViewer, className)}>
            <button
                className={cnImageViewerButton}
                onClick={prev}
            >
                Назад
            </button>
            <div className={cnImageViewerImageArea}>
                {images[index] ? 
                    <FilesListItem
                        className={cnImageViewerItem}
                        image={images[index]}
                        disabled={disabled}
                        selectFace={i => selectFace(images[index].localId, i)}
                    /> : null}
            </div>
            <button
                className={cnImageViewerButton}
                onClick={next}
            >
                Вперед
            </button>
        </div>
    );
}
