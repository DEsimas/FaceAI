import React, { useCallback, useEffect, MouseEvent, useRef, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import type { FacesCoordinates } from '../../App';
import { cnFilesListItem, cnFilesListItemCanvas, cnFilesListItemImage } from './FilesListItem.classnames';
import type { FilesListItemProps, Offset, Size } from './FilesListItem.typings';

import './FilesListItem.scss';

export function FilesListItem(props: FilesListItemProps) {
    const { className, image, disabled } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<Size>({width: 0, height: 0});
    const [scaledCoordinates, setScaledCoordinates] = useState<FacesCoordinates>(image.faces);
    const [offset, setOffset] = useState<Offset>({left: 0, top: 0});
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(!wrapper.current)
            return;
        const resizeObserver = new ResizeObserver(() => {
            if(!wrapper.current)
                return;
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
        });
        resizeObserver.observe(wrapper.current);
        return () => resizeObserver.disconnect();
    }, [wrapper, setSize]);

    useEffect(() => {
        if(!wrapper.current)
            return;
        setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
    }, [wrapper, setOffset]);

    useEffect(() => {
        if (!image.faces)
            return;
        const scaledCoordinates: FacesCoordinates = [];
        for (const face of image.faces) {
            const x = size.width / image.resolution.width;
            const y = size.height / image.resolution.height;
            scaledCoordinates.push(
                [[face[0][0] * x, face[0][1] * y],
                [face[1][0] * x, face[1][1] * y]]
            );
        }
        setScaledCoordinates([...scaledCoordinates]);
    }, [size, image, setScaledCoordinates]);

    useEffect(() => {
        if(!scaledCoordinates)
            return;
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.height = size.height;
        ctx.canvas.width = size.width;
        for (let i = 0; i < scaledCoordinates.length; i++) {
            const face = scaledCoordinates[i];
            const color = disabled ? 'yellow' : image.selectedIndexes.includes(i) ? 'green' : hoverIndex === i ? 'orange' : 'red';
            const text = ` #${i + 1}`;
            ctx.beginPath();
            ctx.rect(face[0][0], face[0][1], face[1][0] - face[0][0], face[1][1] - face[0][1]);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.font = "bold 16px Arial";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.strokeText(text, face[0][0], face[0][1])
            ctx.fillText(text, face[0][0], face[0][1]);
            ctx.closePath();
        }
    }, [scaledCoordinates, hoverIndex, canvas, image]);

    const onClickHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        // const x = e.pageX - offset.left;
        // const y = e.pageY - offset.top;

        // for (let i = 0; i < actualCoordinates.length; i++) {
        //     const rect = actualCoordinates[i];
        //     const p1 = rect[0];
        //     const p2 = rect[1];
        //     if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1]) {
        //         setSelected(prev => {
        //             const n = prev.map(() => false);
        //             n[i] = !prev[i];
        //             for (let i = 0; i < n.length; i++)
        //                 selection[i] = n[i];
        //             return n;
        //         });
        //         break;
        //     }
        // }
    }, [/**/]);

    const onMouseMoveHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        if(!scaledCoordinates)
            return;

        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        document.documentElement.style.cursor = 'default';
        for (let i = 0; i < scaledCoordinates.length; i++) {
            const face = scaledCoordinates[i];
            const p1 = face[0];
            const p2 = face[1];
            setHoverIndex(undefined);
            if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1]) {
                document.documentElement.style.cursor = 'pointer';
                setHoverIndex(i);
                break;
            }
        }
    }, [offset, scaledCoordinates, setHoverIndex]);

    const onMouseLeaveHandler = useCallback(() => {
        setHoverIndex(undefined);
    }, [setHoverIndex])

    return (
        <div
            className={classnames(cnFilesListItem, className)}
            ref={wrapper}
        >
            <img className={cnFilesListItemImage} src={image.url} />
            <canvas
                onMouseMove={disabled ? null : onMouseMoveHandler}
                onMouseLeave={disabled ? null : onMouseLeaveHandler}
                onClick={disabled ? null : onClickHandler}
                className={cnFilesListItemCanvas}
                ref={canvas}
            />
        </div >
    )
}