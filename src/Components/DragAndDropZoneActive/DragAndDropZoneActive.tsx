import React from 'react';
import { cnDragAndDropZoneActive, cnDragAndDropZoneActiveShadow, cnDragAndDropZoneActiveText } from './DragAndDropZoneActive.classnames';
import { classnames } from '@bem-react/classnames';
import type { DragAndDropZoneActiveProps } from './DragAndDropZoneActive.typings';

import './DragAndDropZoneActive.scss'

export function DragAndDropZoneActive(props: DragAndDropZoneActiveProps) {
    const { onDragLeave, onDragOver, onDragStart, onDrop, className } = props;

    return (
        <div
            className={classnames(cnDragAndDropZoneActive, className)}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
        >
            <div className={cnDragAndDropZoneActiveShadow}>
                <div className={cnDragAndDropZoneActiveText}>Можно отпускать</div>
            </div>
        </div>
    )
}