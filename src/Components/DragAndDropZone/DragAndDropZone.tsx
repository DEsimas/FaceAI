import React, { useCallback, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnDragAndDropZone, cnDragAndDropZoneActive, cnDragAndDropZoneIdle } from './DragAndDropZone.classnames';
import { DragAndDropZoneIdle } from '../DragAndDropZoneIdle';
import { DragAndDropZoneActive } from '../DragAndDropZoneActive';
import type { DragAndDropZoneProps } from './DragAndDropZone.typings';

import './DragAndDropZone.scss';

export function DragAndDropZone(props: DragAndDropZoneProps) {
    const { className, files } = props;

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
        files.push(...e.dataTransfer.files);
        setDrag(false);
    }, [setDrag]);

    return (
        <div className={classnames(cnDragAndDropZone, className)}>
            {drag ?
                <DragAndDropZoneActive
                    className={cnDragAndDropZoneActive}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDragStart={dragStartHandler}
                    onDrop={dragDropHandler}
                    files={files}
                /> :
                <DragAndDropZoneIdle
                    className={cnDragAndDropZoneIdle}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDragStart={dragStartHandler}
                    files={files}
                />
            }

        </div>
    )
}