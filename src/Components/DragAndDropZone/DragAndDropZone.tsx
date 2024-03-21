import React, { useCallback, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { FilesTable } from '../FilesTable';
import { cnDragAndDropZone,  cnDragAndDropZonePreview } from './DragAndDropZone.classnames';
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
                isDisabled={drag}
                addFiles={addImages}
            />
        </div>
    );
}
