import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnGalleryItem } from './GalleryItem.classnames';
import type { GalleryItemProps } from './GalleryItem.typings';

import './GalleryItem.scss';

export function GalleryItem(props: GalleryItemProps) {
    const { width, height, children, className } = props;

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
            className={classnames(cnGalleryItem, className)}
        >
            {children}
        </div>
    );
}
