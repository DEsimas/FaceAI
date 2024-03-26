import React from 'react';
import { classnames } from '@bem-react/classnames';
import { getRowHeight } from '../../Utils/getRowHeight';
import { GalleryItem } from '../GalleryItem';
import { cnGalleryRow } from './GalleryRow.classnames';
import type { GalleryRowProps } from './GalleryRow.typings';

export function GalleryRow(props: GalleryRowProps) {
    const { items, width, className } = props;

    const h = getRowHeight(width, items, 10);

    return (
        <div className={classnames(cnGalleryRow, className)}>
            {
                items.map(item => <GalleryItem height={h} width={h * item.width / item.height} key={item.id}>{item.element}</GalleryItem>)
            }
        </div>
    );
}
