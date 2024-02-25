import React from 'react';
import { cnDragAndDropZoneActive } from './DragAndDropZoneActive.classnames';
import { classnames } from '@bem-react/classnames';
import type { DragAndDropZoneActiveProps } from './DragAndDropZoneActive.typings';

export function DragAndDropZoneActive(props: DragAndDropZoneActiveProps) {
    const { files, onDragLeave, onDragOver, onDragStart, onDrop, className } = props;

    return (
        <div
            className={classnames(cnDragAndDropZoneActive, className)}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
        >
            Отпустите
        </div>
    )
}