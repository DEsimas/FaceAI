import React from 'react';
import { DragAndDropZone } from '../../Components/DragAndDropZone';
import { Header } from '../../Components/Header';
import { cnLoadFilesButton, cnLoadFilesDADZone } from './LoadFiles.classnames';

import './LoadFiles.scss';
import { Button } from '../../Components/Button';

export function LoadFiles() {
    return (
        <body>
            <Header
                text='Загрузите фотографии лиц для сравнения'
            />
            <DragAndDropZone className={cnLoadFilesDADZone} />
            <Button
                className={cnLoadFilesButton}
                text='Загрузить'
            />
        </body>
    );
}