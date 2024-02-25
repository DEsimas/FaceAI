import React from 'react';
import { FilesTable } from '../FilesTable/FilesTable';
import { cnDragAndDropZoneIdle } from './DragAndDropZoneIdle.classnames';
import type { DragAndDropZoneIdleProps } from './DragAndDropZoneIdle.typings';
import { classnames } from '@bem-react/classnames';

export function DragAndDropZoneIdle(props: DragAndDropZoneIdleProps) {
    const { files, onDragLeave, onDragOver, onDragStart, className } = props;

    return (
        <div
            className={classnames(cnDragAndDropZoneIdle, className)}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
        >
            {files.length ?
                <FilesTable files={files} /> :
                <span>Перетащите изображения...</span>
            }
        </div>
    );
}
