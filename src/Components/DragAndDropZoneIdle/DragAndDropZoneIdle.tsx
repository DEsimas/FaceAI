import React from 'react';
import { cnDragAndDropZoneIdle, cnDragAndDropZoneIdleText } from './DragAndDropZoneIdle.classnames';
import type { DragAndDropZoneIdleProps } from './DragAndDropZoneIdle.typings';
import { classnames } from '@bem-react/classnames';

import './DragAndDropZoneIdle.scss';

export function DragAndDropZoneIdle(props: DragAndDropZoneIdleProps) {
    const { onDragLeave, onDragOver, onDragStart, className, showText } = props;

    return (
        <div
            className={classnames(cnDragAndDropZoneIdle, className)}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
        >
            {showText ?
                <span className={cnDragAndDropZoneIdleText}>Перетащите изображения...</span> : null
            }
        </div>
    );
}
