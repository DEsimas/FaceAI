import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { GalleryRow } from '../GalleryRow';
import { cnGallery } from './Gallery.classnames';
import { classnames } from '@bem-react/classnames';
import type { GalleryProps, Item } from './Gallery.typings';

import './Gallery.scss';
import { getRowHeight } from '../../Utils/getRowHeight';
import { MIN_IMAGE_HEIGHT } from '../../Constants';

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

    for(let i = 0; i < items.length; i++) {
        row.push(items[i]);
        const h = getRowHeight(width, row, 10);
        if(h < MIN_IMAGE_HEIGHT) {
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
            {rows.map((row) => <GalleryRow items={row} width={width} key={v4()} />)}
        </div>
    );
}
