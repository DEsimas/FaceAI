import React, { useCallback, useEffect, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnDragAndDropBorder, cnDragAndDropHidden, cnDragAndDropMiddle, cnDragAndDropPlaceholder, cnDragAndDropText, cnDragAndDropZone, cnDragAndDropZoneActive } from './DragAndDropZone.classnames';
import type { DragAndDropZoneProps } from './DragAndDropZone.typings';

import PlaceholderImage from './../../Assets/Placeholder.png';

import './DragAndDropZone.scss';

export function DragAndDropZone(props: DragAndDropZoneProps) {
    const { className, addImages } = props;

    const [isDrag, setIsDrag] = useState(false);

    const dragStartHandler = useCallback((e: DragEvent) => {
        e.preventDefault();
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
        window.ondrop = dragDropHandler;
        return () => {
            window.ondragover = undefined;
            window.ondragstart = undefined;
            window.ondragleave = undefined;
            window.ondrop = undefined;
        };
    }, []);

    return (
        <div
            className={classnames(cnDragAndDropZone, className)}
            style={{ zIndex: isDrag ? 1 : -1 }}
        >
            {isDrag ?
                <div className={cnDragAndDropZoneActive}>
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
                </div>
                : null}
            <img
                alt='placeholder'
                src={PlaceholderImage}
                className={cnDragAndDropHidden}
            />
        </div>
    );
}
