import React, { useCallback, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { FilesTable } from '../FilesTable';
import { cnDragAndDropZone,  cnDragAndDropZonePreview } from './DragAndDropZone.classnames';
import type { DragAndDropZoneProps } from './DragAndDropZone.typings';

import './DragAndDropZone.scss';

export function DragAndDropZone(props: DragAndDropZoneProps) {
    const { className, images, addImages, removeImage } = props;

    const [dragAmount, setDragAmount] = useState(0);

    const dragStartHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragAmount(e.dataTransfer.items.length);
    }, [setDragAmount]);

    const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragAmount(0);
    }, [setDragAmount]);

    const dragDropHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragAmount(0);
        addImages(Array.from(e.dataTransfer.files));
    }, [setDragAmount, addImages]);

    return (
        <div
            className={classnames(cnDragAndDropZone, className)}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
            onDragStart={dragStartHandler}
            onDrop={dragDropHandler}
        >
            <FilesTable
                className={cnDragAndDropZonePreview}
                images={images}
                removeImage={removeImage}
                dragAmount={dragAmount}
                addFiles={addImages}
            />
        </div>
    );
}
