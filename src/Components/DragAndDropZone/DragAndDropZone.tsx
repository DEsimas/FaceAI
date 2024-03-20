import React, { useCallback, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { DragAndDropZoneIdle } from '../DragAndDropZoneIdle';
import { DragAndDropZoneActive } from '../DragAndDropZoneActive';
import { FilesTable } from '../FilesTable';
import { cnDragAndDropZone, cnDragAndDropZoneActive, cnDragAndDropZoneIdle, cnDragAndDropZonePreview } from './DragAndDropZone.classnames';
import type { DragAndDropZoneProps } from './DragAndDropZone.typings';

import './DragAndDropZone.scss';

export function DragAndDropZone(props: DragAndDropZoneProps) {
    const { className, images, addImages, removeImage } = props;

    const [drag, setDrag] = useState(false);

    const dragStartHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }, [setDrag]);

    const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }, [setDrag]);

    const dragDropHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
        addImages(Array.from(e.dataTransfer.files));
    }, [setDrag, addImages]);

    return (
        <div className={classnames(cnDragAndDropZone, className)}>
            {drag ?
                <DragAndDropZoneActive
                    className={cnDragAndDropZoneActive}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDragStart={dragStartHandler}
                    onDrop={dragDropHandler}
                /> :
                <DragAndDropZoneIdle
                    className={cnDragAndDropZoneIdle}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDragStart={dragStartHandler}
                    showText={images.length === 0}
                />}
            {images.length ?
                <FilesTable
                    className={cnDragAndDropZonePreview}
                    images={images}
                    removeImage={removeImage}
                    isDisabled={drag}
                /> : null}
        </div>
    );
}
