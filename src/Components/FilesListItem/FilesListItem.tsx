import React, { useCallback, useEffect, MouseEvent, useRef, useState } from 'react';
import { cnFilesListItem, cnFilesListItemCanvas, cnFilesListItemImage } from './FilesListItem.classnames';
import { FilesListItemProps, Offset, Size } from './FilesListItem.typings';

import './FilesListItem.scss';

export function FilesListItem(props: FilesListItemProps) {
    const { file, imageCoordinates } = props;

    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    console.log(imageCoordinates);

    // const leftTop = coordinates[0];
    // const rightBottom = coordinates[1];
    // const x = leftTop[0];
    // const y = leftTop[1];
    // const w = rightBottom[0] - leftTop[0];
    // const h = rightBottom[1] - leftTop[1];
    // const p1 = [x, y];
    // const p2 = [x + w, y + w];

    useEffect(() => {
        // const ctx = canvas.current.getContext('2d');
        // ctx.canvas.height = size.height;
        // ctx.canvas.width = size.width;
        // ctx.rect(x, y, w, h);
        // ctx.strokeStyle = 'red';
        // ctx.stroke();
    }, [size, offset]);

    useEffect(() => {
        setTimeout(() => {
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
            setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        }, 100)
    }, []);

    const onClickHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        // const x = e.pageX - offset.left;
        // const y = e.pageY - offset.top;
        // if (x >= p1[0] && x <= p2[0] && y >= p1[0] && y <= p2[0]) {
        //     const ctx = canvas.current.getContext('2d');
        //     ctx.strokeStyle = 'green';
        //     ctx.stroke();
        // }
    }, [canvas, offset]);

    return (
        <div
            className={cnFilesListItem}
            ref={wrapper}
        >
            <img className={cnFilesListItemImage} src={URL.createObjectURL(file)} />
            <canvas onClick={onClickHandler} className={cnFilesListItemCanvas} ref={canvas} />
        </div >
    )
}