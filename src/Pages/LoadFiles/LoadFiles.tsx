import React from 'react';
import { DragAndDropZone } from '../../Components/DragAndDropZone';
import { cnLoadFilesDADZone } from './LoadFiles.classnames';

import './LoadFiles.scss';

export function LoadFiles() {
    return (
        <body>
            <DragAndDropZone className={cnLoadFilesDADZone} />
        </body>
    );
}