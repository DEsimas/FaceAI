import React, { useEffect, useRef, useState } from 'react';
import { getRowHeight } from '../../Utils/getRowHeight';
import { GalleryRow } from '../GalleryRow';
import { cnGallery } from './Gallery.classnames';
import { classnames } from '@bem-react/classnames';
import type { GalleryProps, Item } from './Gallery.typings';

import './Gallery.scss';

const MIN_IMAGE_HEIGHT = 300;

export function Gallery(props: GalleryProps) {
    const { className, items } = props;

    const gallery = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!gallery.current) {
            return;
        }
        setWidth(gallery.current.clientWidth);
        const resizeObserver = new ResizeObserver(() => {
            if (!gallery.current)
                return;
            setWidth(gallery.current.clientWidth);
        });
        resizeObserver.observe(gallery.current);
        return () => resizeObserver.disconnect();
    }, []);

    const rows: Item[][] = [];
    let row: Item[] = [];

    for (let i = 0; i < items.length; i++) {
        row.push(items[i]);
        const h = getRowHeight(width, row, 10);
        if (h < MIN_IMAGE_HEIGHT) {
            row.pop();
            rows.push(row);
            row = [items[i]];
        }
    }
    row.length && rows.push(row);

    return (
        <div
            className={classnames(cnGallery, className)}
            ref={gallery}
        >
            {rows.map((row, index) => <GalleryRow items={row} width={width} key={index} />)}
        </div>
    );
}
