import React, { useCallback, useEffect, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnDragAndDropBorder, cnDragAndDropMiddle, cnDragAndDropPlaceholder, cnDragAndDropText, cnDragAndDropZone } from './DragAndDrop.classnames';
import type { DragAndDropProps } from './DragAndDrop.typings';

import PlaceholderImage from './../../Assets/Placeholder.png';

import './DragAndDrop.scss';

export function DragAndDrop(props: DragAndDropProps) {
    const { className, addImages } = props;

    const [isDrag, setIsDrag] = useState(false);

    const dragStartHandler = useCallback((e: DragEvent) => {
        e.preventDefault();
        if (Array.from(e.dataTransfer.items).reduce((flag, item) => item.kind === 'file' ? flag : false, true))
            setIsDrag(true);
    }, []);

    const dragLeaveHandler = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDrag(false);
    }, []);

    const dragDropHandler = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDrag(false);
        addImages(Array.from(e.dataTransfer.files));
    }, [addImages]);

    useEffect(() => {
        window.ondragover = dragStartHandler;
        window.ondragstart = dragStartHandler;
        window.ondragleave = dragLeaveHandler;
        return () => {
            window.ondragover = undefined;
            window.ondragstart = undefined;
            window.ondragleave = undefined;
            window.ondrop = undefined;
        };
    }, []);

    useEffect(() => {
        window.ondrop = dragDropHandler;
        return () => window.ondrop = undefined;
    }, [addImages]);

    return (
        <div
            className={classnames(cnDragAndDropZone, className)}
            style={{
                zIndex: isDrag ? 2 : -1,
                display: isDrag ? 'block' : 'none',
            }}
        >
            <div className={cnDragAndDropBorder}>
                <div className={cnDragAndDropMiddle}>
                    <img
                        alt='placeholder'
                        src={PlaceholderImage}
                        className={cnDragAndDropPlaceholder}
                    />
                    <p className={cnDragAndDropText}>Перетащите изображение сюда</p>
                </div>
            </div>
        </div >
    );
}