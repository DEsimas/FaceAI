import React, { useCallback, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { v4 } from 'uuid';
import { getImageResolution } from '../../Utils/getImageResolution';
import type { ImageFiles } from '../../App';
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

    const dragDropHandler = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
        const files: ImageFiles = [];
        for (const file of e.dataTransfer.files) {
            const url = URL.createObjectURL(file);
            files.push({
                file: file,
                localId: v4(),
                url: url,
                resolution: await getImageResolution(url),
                selectedIndexes: []
            });
        }
        addImages(files);
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
    )
}