import React, { useCallback, useEffect, MouseEvent, useRef, useState } from 'react';
import { cnFilesListItem, cnFilesListItemCanvas, cnFilesListItemImage } from './FilesListItem.classnames';
import { FilesListItemProps, Offset, Size } from './FilesListItem.typings';
import type { Image } from '../../App';

import './FilesListItem.scss';

export function FilesListItem(props: FilesListItemProps) {
    const { file, imageCoordinates, selection } = props;
    const emptyArray = imageCoordinates.map(() => false);
    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const [fileSize, setFileSize] = useState<Size>({ width: 0, height: 0 });
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const [offset, setOffset] = useState<Offset>({ top: 0, left: 0 });
    const [selected, setSelected] = useState([...emptyArray]);
    const [hovered, setHovered] = useState([...emptyArray]);
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
        }, 500);

        const fileURL = URL.createObjectURL(file);
        const img = new Image;
        img.onload = function () {
            setFileSize({ width: img.width, height: img.height });
            URL.revokeObjectURL(img.src);
        };
        img.src = fileURL;
        return () => resizeObserver.disconnect();
    }, [wrapper])

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
            const color = selected[i] ? 'green' : hovered[i] ? 'orange' : 'red';
            const text = `${file.name} #${i + 1}`;
            ctx.beginPath();
            ctx.rect(rect[0][0], rect[0][1], rect[1][0] - rect[0][0], rect[1][1] - rect[0][1]);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.font = "bold 16px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.strokeText(text, rect[0][0], rect[0][1])
            ctx.fillText(text, rect[0][0], rect[0][1]);
            ctx.closePath();
        }
    }, [size, actualCoordinates, selected, hovered]);

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

    const onMouseMoveHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        for (let i = 0; i < actualCoordinates.length; i++) {
            const rect = actualCoordinates[i];
            const p1 = rect[0];
            const p2 = rect[1];
            setHovered([...emptyArray]);
            if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1]) {
                setHovered((prev) => {
                    const n = [...prev];
                    n[i] = true;
                    return n;
                });
                break;
            }
        }
    }, [offset, setHovered]);

    const onMouseLeaveHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        setHovered([...emptyArray]);
    }, [setHovered])

    return (
        <div
            className={cnFilesListItem}
            ref={wrapper}
        >
            <img className={cnFilesListItemImage} src={URL.createObjectURL(file)} />
            <canvas
                onMouseMove={onMouseMoveHandler}
                onMouseLeave={onMouseLeaveHandler}
                onClick={onClickHandler}
                className={cnFilesListItemCanvas}
                ref={canvas}
            />
        </div >
    )
}