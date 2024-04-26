import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { useListener } from 'react-bus';
import { classnames } from '@bem-react/classnames';
import type { FacesCoordinates } from '../../App';
import { getScaledCoordinates } from '../../Utils/getScaledCoordinates';
import { ImageButtons } from '../ImageButtons';
import { cnImage, cnImageButtons, cnImageCanvas, cnImageImage, cnImageLoader, cnImageLoading } from './Image.classnames';
import type { ImageProps, Offset, Size } from './Image.typings';

import './Image.scss';

export function Image(props: ImageProps) {
    const { modalOffset, className, image, selectFace, removeImage, disabled, selectedIndexes, fullscreenImage, hideButtons, isLoading } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const [offset, setOffset] = useState<Offset | undefined>(undefined);
    const [size, setSize] = useState<Size | undefined>({ width: 0, height: 0 });
    const [scaledCoordinates, setScaledCoordinates] = useState<FacesCoordinates | undefined>(undefined);
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

    useListener('amountOfImagesChanged', () => setTimeout(rescale, 10));

    useEffect(() => {
        if (!wrapper.current)
            return;
        if (!scaledCoordinates && image.faces) {
            const scaledCoordinates: FacesCoordinates = [];
            for (const face of image.faces)
                scaledCoordinates.push(getScaledCoordinates(image.resolution, face, size));
            setScaledCoordinates(scaledCoordinates);
        }
        setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });

        const resizeObserver = new ResizeObserver(rescale);
        resizeObserver.observe(wrapper.current);

        const intersectionObserver = new IntersectionObserver(() => {
            if (!wrapper.current)
                return;
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
            setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        });
        intersectionObserver.observe(wrapper.current);

        // Костыль: реренденим обводки каждую секунду, чтобы картинка не была долго в сломанном состоянии
        const interval = setInterval(() => {
            if (!wrapper.current)
                return;
            setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
            setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
        }, 1000);

        return () => {
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            clearInterval(interval);
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
            let color: string = 'red';
            if (hoverIndex === i && window.innerWidth >= 420)
                color = 'orange';
            if (selectedIndexes.includes(i))
                color = 'green';
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

    const rescale = useCallback(() => {
        if (!wrapper.current)
            return;
        setOffset({ top: wrapper.current.offsetTop, left: wrapper.current.offsetLeft });
        setSize({ height: wrapper.current.offsetHeight, width: wrapper.current.offsetWidth });
    }, [wrapper]);

    const onClickHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        if (!scaledCoordinates || !selectFace)
            return;

        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top - (modalOffset ? window.scrollY : 0);

        for (let i = 0; i < scaledCoordinates.length; i++) {
            const rect = scaledCoordinates[i];
            const p1 = rect[0];
            const p2 = rect[1];
            if (x >= p1[0] && x <= p2[0] && y >= p1[1] && y <= p2[1] && (selectedIndexes.includes(i) || !disabled)) {
                selectFace(i);
                break;
            }
        }
    }, [scaledCoordinates, offset, disabled, selectedIndexes]);

    const onMouseMoveHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        if (!scaledCoordinates)
            return;

        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top - (modalOffset ? window.scrollY : 0);

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
            {isLoading ? <div className={cnImageLoading}>
                <div className={cnImageLoader} />
            </div> : null}
            <img className={cnImageImage} src={image.url} />
            <canvas
                onMouseMove={onMouseMoveHandler}
                onMouseLeave={onMouseLeaveHandler}
                onClick={onClickHandler}
                className={cnImageCanvas}
                ref={canvas}
            />
            {hideButtons ? null :
                <ImageButtons
                    className={cnImageButtons}
                    removeImage={removeImage ? removeImage : null}
                    fullscreenImage={fullscreenImage ? fullscreenImage : null}
                />}
        </div >
    );
}
