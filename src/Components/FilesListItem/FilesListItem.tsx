import React, { useCallback, useEffect, MouseEvent, useRef, useState } from 'react';
import { cnFilesListItem, cnFilesListItemCanvas, cnFilesListItemImage } from './FilesListItem.classnames';
import { FilesListItemProps, Offset, Size } from './FilesListItem.typings';
import type { Image } from '../../App';

import './FilesListItem.scss';

export function FilesListItem(props: FilesListItemProps) {
    const { file, imageCoordinates, selection } = props;
    const selectedInit = imageCoordinates.map(() => false);
    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const [fileSize, setFileSize] = useState<Size>({ width: 0, height: 0 });
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });
    const [selected, setSelected] = useState(selectedInit);
    const [actualCoordinates, setActualCoordinates] = useState<Image>(imageCoordinates);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
            setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        });
        resizeObserver.observe(wrapper.current);

        setTimeout(() => {
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
            setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        }, 100);

        const fileURL = URL.createObjectURL(file);
        const img = new Image;
        img.onload = function () {
            setFileSize({ width: img.width, height: img.height });
            URL.revokeObjectURL(img.src);
        };
        img.src = fileURL;
        return () => resizeObserver.disconnect();
    }, [])

    useEffect(() => {
        const actualCoordinates: Image = [];
        for (const rect of imageCoordinates) {
            const x = size.width / fileSize.width;
            const y = size.height / fileSize.height;
            actualCoordinates.push(
                [[rect[0][0] * x, rect[0][1] * y],
                [rect[1][0] * x, rect[1][1] * y]]
            );
        }
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.height = size.height;
        ctx.canvas.width = size.width;
        for (let i = 0; i < actualCoordinates.length; i++) {
            const rect = actualCoordinates[i];
            ctx.beginPath();
            ctx.rect(rect[0][0], rect[0][1], rect[1][0] - rect[0][0], rect[1][1] - rect[0][1]);
            ctx.strokeStyle = selected[i] ? 'green' : 'red';
            ctx.stroke();
            ctx.fillStyle = selected[i] ? 'green' : 'red';
            ctx.font = "bold 16px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`${file.name} #${i + 1}`, rect[0][0], rect[0][1]);
            ctx.closePath();
        }
    }, [size, actualCoordinates, selected]);

    useEffect(() => {
        const actualCoordinates: Image = [];
        for (const rect of imageCoordinates) {
            const x = size.width / fileSize.width;
            const y = size.height / fileSize.height;
            actualCoordinates.push(
                [[rect[0][0] * x, rect[0][1] * y],
                [rect[1][0] * x, rect[1][1] * y]]
            );
        }
        setActualCoordinates(actualCoordinates);
    }, [size, fileSize]);

    const onClickHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        for (let i = 0; i < actualCoordinates.length; i++) {
            const rect = actualCoordinates[i];
            const p1 = rect[0];
            const p2 = rect[1];
            if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1]) {
                setSelected(prev => {
                    const n = prev.map(() => false);
                    n[i] = !prev[i];
                    for (let i = 0; i < n.length; i++)
                        selection[i] = n[i];
                    return n;
                });
                break;
            }
        }
    }, [canvas, offset, actualCoordinates]);

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