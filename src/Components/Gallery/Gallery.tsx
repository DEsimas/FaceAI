import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { GalleryRow } from '../GalleryRow';
import { cnGallery } from './Gallery.classnames';
import { classnames } from '@bem-react/classnames';
import type { GalleryProps, Item } from './Gallery.typings';

import './Gallery.scss';

const MIN_WIDTH = 310;

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

    const rows: Item[][] = [items];

    return (
        <div
            className={classnames(cnGallery, className)}
            ref={gallery}
        >
            {rows.map((row) => <GalleryRow items={row} width={width} key={v4()} />)}
        </div>
    );
}
