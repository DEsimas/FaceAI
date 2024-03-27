import React, { useCallback, useEffect, MouseEvent, useRef, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import type { FacesCoordinates } from '../../App';
import { getScaledCoordinates } from '../../Utils/getScaledCoordinates';
import { cnFilesListCloseButton, cnImage, cnImageCanvas, cnImageImage } from './Image.classnames';
import type { ImageProps, Offset, Size } from './Image.typings';

import './Image.scss';
import { Button } from '../Button';

export function Image(props: ImageProps) {
    const { className, image, selectFace, removeImage, disabled } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState<Offset | undefined>(undefined);
    const [size, setSize] = useState<Size | undefined>({ width: 0, height: 0 });
    const [scaledCoordinates, setScaledCoordinates] = useState<FacesCoordinates | undefined>(undefined);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!scaledCoordinates && image.faces) {
            const scaledCoordinates: FacesCoordinates = [];
            for (const face of image.faces)
                scaledCoordinates.push(getScaledCoordinates(image.resolution, face, size));
            setScaledCoordinates(scaledCoordinates);
        }
        setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });

        const resizeObserver = new ResizeObserver(() => {
            if (!wrapper.current)
                return;
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
        });
        resizeObserver.observe(wrapper.current);

        const intersectionObserver = new IntersectionObserver(() => {
            if (!wrapper.current)
                return;
            setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        });
        intersectionObserver.observe(wrapper.current);

        return () => {
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.width = size.width;
        ctx.canvas.height = size.height;
        const scaledCoordinates: FacesCoordinates = [];
        if (image.faces) {
            for (const face of image.faces)
                scaledCoordinates.push(getScaledCoordinates(image.resolution, face, size));
            setScaledCoordinates(scaledCoordinates);
        }
    }, [size]);

    useEffect(() => {
        if (!scaledCoordinates)
            return;
        const ctx = canvas.current.getContext('2d');
        for (let i = 0; i < scaledCoordinates.length; i++) {
            const face = scaledCoordinates[i];
            const color = selectedIndexes.includes(i) ? 'green' : hoverIndex === i ? 'orange' : 'red';
            ctx.beginPath();
            ctx.rect(face[0][0], face[0][1], face[1][0] - face[0][0], face[1][1] - face[0][1]);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    }, [scaledCoordinates, hoverIndex, selectedIndexes]);

    const onClickHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        if (!scaledCoordinates || !selectFace)
            return;

        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        for (let i = 0; i < scaledCoordinates.length; i++) {
            const rect = scaledCoordinates[i];
            const p1 = rect[0];
            const p2 = rect[1];
            if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1]) {
                setSelectedIndexes(selectedIndexes => {
                    const indexOf = selectedIndexes.indexOf(i);
                    if (indexOf === -1 && !disabled) {
                        selectedIndexes.push(i);
                        selectFace(i);
                    }
                    if (indexOf !== - 1) {
                        selectedIndexes.splice(indexOf, 1);
                        selectFace(i);
                    }
                    return [...selectedIndexes];
                });
                break;
            }
        }
    }, [scaledCoordinates, offset, disabled]);

    const onMouseMoveHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        if (!scaledCoordinates)
            return;

        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        document.documentElement.style.cursor = 'default';
        for (let i = 0; i < scaledCoordinates.length; i++) {
            const face = scaledCoordinates[i];
            const p1 = face[0];
            const p2 = face[1];
            setHoverIndex(undefined);
            if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1] && (!disabled || selectedIndexes.includes(i))) {
                document.documentElement.style.cursor = 'pointer';
                setHoverIndex(i);
                break;
            }
        }
    }, [scaledCoordinates, offset, selectedIndexes]);

    const onMouseLeaveHandler = useCallback(() => {
        setHoverIndex(undefined);
    }, [setHoverIndex]);

    return (
        <div
            className={classnames(cnImage, className)}
            ref={wrapper}
        >
            <img className={cnImageImage} src={image.url} />
            <canvas
                onMouseMove={onMouseMoveHandler}
                onMouseLeave={onMouseLeaveHandler}
                onClick={onClickHandler}
                className={cnImageCanvas}
                ref={canvas}
            />
            <Button
                className={cnFilesListCloseButton}
                onClick={removeImage}
                type='close'
            />
        </div >
    );
}
