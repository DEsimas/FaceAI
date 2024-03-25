import React from 'react';
import { classnames } from '@bem-react/classnames';
import { GalleryItem } from '../GalleryItem';
import { cnGalleryRow } from './GalleryRow.classnames';
import type { GalleryRowProps } from './GalleryRow.typings';

export function GalleryRow(props: GalleryRowProps) {
    const { items, width, className } = props;

    const h = (width - 1) / items.reduce((sum, item) => sum += item.width / item.height, 0);

    return (
        <div className={classnames(cnGalleryRow, className)}>
            {
                items.map(item => <GalleryItem height={h} width={h * item.width / item.height} key={item.id}>{item.element}</GalleryItem>)
            }
        </div>
    );
}
