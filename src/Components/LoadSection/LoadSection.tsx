import React from 'react';
import { classnames } from '@bem-react/classnames';
import { DragAndDropZone } from '../DragAndDropZone';
import { Header } from '../Header';
import { cnLoadSection, cnLoadSectionDADZone } from './LoadSection.classnames';
import type { LoadSectionProps } from './LoadSection.typings';

import './LoadSection.scss';

export function LoadSection(props: LoadSectionProps) {
    const { className, images, addImages, removeImage } = props;

    return (
        <div className={classnames(cnLoadSection, className)}>
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