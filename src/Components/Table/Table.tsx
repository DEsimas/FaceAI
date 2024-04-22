import React, { useEffect, useRef, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { MAXIMUM_AMOUNT_OF_SELECTED_FACES } from '../../Constants';
import { Prompt } from '../Prompt';
import { cnTable, cnTableCanvas } from './Table.classnames';
import type { SubImage, TableProps } from './Table.typings';

import MTUCI from './../../Assets/MTUCI.svg';

import './Table.scss';

export function Table(props: TableProps) {
    const { images, table, className } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const [rerender, setRerender] = useState(0);

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            setRerender(r => r+1);
        });
        observer.observe(wrapper.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const subImages: SubImage[] = [];
        for (const image of images) {
            for (const face of image.faces.filter((_, index) => image.selectedIndexes.includes(index))) {
                subImages.push({
                    url: image.url,
                    face: face
                });
            }
        }
        if (!canvas.current || !wrapper.current || subImages.length !== table.length) {
            return;
        }
        const amount = subImages.length + 1;
        const size = wrapper.current.clientWidth;
        const gapSize = size / 100;
        const cellSize = (size - gapSize * (amount - 2)) / amount;
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.width = size;
        ctx.canvas.height = size;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.max(width <= 1400 ? 10 : 40 * (1 - amount / MAXIMUM_AMOUNT_OF_SELECTED_FACES), 16)}px Arial`;
        for (let i = 0; i < amount; i++) {
            for (let j = 0; j < amount; j++) {
                const y = i * cellSize + gapSize * (i - 1);
                const x = j * cellSize + gapSize * (j - 1);
                if (i !== 0 && j !== 0) {
                    if (table[i - 1][j - 1] > 80)
                        ctx.fillStyle = 'green';
                    else if (table[i - 1][j - 1] > 70)
                        ctx.fillStyle = 'orange';
                    else
                        ctx.fillStyle = 'red';
                    ctx.fillRect(x, y, cellSize, cellSize);
                    ctx.fillStyle = 'black';
                    ctx.fillText(`${Math.round(table[i - 1][j - 1] * 100) / 100}%`, x + cellSize / 2, y + cellSize / 2);
                } else if (j !== i) {
                    const subImage = i === 0 ? subImages[j - 1] : subImages[i - 1];
                    const image = new Image();
                    image.onload = () => {
                        const width = subImage.face[1][0] - subImage.face[0][0];
                        const height = subImage.face[1][1] - subImage.face[0][1];
                        const size = Math.max(width, height);
                        const ratio = cellSize / Math.max(width, height);
                        const d = size * ratio;
                        ctx.drawImage(
                            image,
                            subImage.face[0][0] - (size - width) / 2,
                            subImage.face[0][1],
                            size, size,
                            x, y, d, d
                        );
                    };
                    image.src = subImage.url;
                } else {
                    const image = new Image();
                    image.onload = () => {
                        ctx.drawImage(
                            image,
                            0,0,512,512,
                            x,y,cellSize,cellSize
                        );
                    };
                    image.src = MTUCI;
                }
            }
        }
    }, [table, images, rerender]);

    return (
        <div
            className={classnames(cnTable, className)}
            ref={wrapper}
        >
            {window.innerWidth <= 420 ? null : <Prompt />}
            <canvas
                className={cnTableCanvas}
                ref={canvas}
            />
        </div>
    );
}
