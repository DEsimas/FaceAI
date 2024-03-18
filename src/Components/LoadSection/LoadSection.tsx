import React from 'react';
import { DragAndDropZone } from '../DragAndDropZone';
import { Header } from '../Header';
import { cnLoadSection, cnLoadSectionDADZone } from './LoadSection.classnames';
import type { LoadSectionProps } from './LoadSection.typings';

import './LoadSection.scss';

export function LoadSection(props: LoadSectionProps) {
    const { images, addImages, removeImage } = props;

    return (
        <div className={cnLoadSection}>
            <Header
                text='Загрузите фотографии лиц для сравнения'
            />
            <DragAndDropZone
                className={cnLoadSectionDADZone}
                images={images}
                addImages={addImages}
                removeImage={removeImage}
            />
        </div>
    );
}