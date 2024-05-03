import React, { useEffect, useRef } from 'react';
import { classnames } from '@bem-react/classnames';
// import useWidth from '../../Hooks/UseWidth';
// import { Prompt } from '../Prompt';
import type { ImageFiles } from '../../App';
import { cnTable, cnTableCanvas } from './Table.classnames';
import type { SubImage, TableProps } from './Table.typings';

import MTUCI from './../../Assets/MTUCI.svg';

import './Table.scss';

const drawCanvas = (canvas: HTMLCanvasElement, size: number, images: ImageFiles, table: number[][]): void => {
    const subImages: SubImage[] = [];
    for (const image of images) {
        for (const face of image.faces.filter((_, index) => image.selectedIndexes.includes(index))) {
            subImages.push({
                url: image.url,
                face: face
            });
        }
    }
    if (subImages.length !== table.length) {
        return;
    }
    const amount = subImages.length + 1;
    const gapSize = size / 300;
    const cellSize = (size - gapSize * (amount - 2)) / amount;
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = size;
    ctx.canvas.height = size;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = `bold ${cellSize / 3}px Arial`;
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
                ctx.fillText(`${Math.round(table[i - 1][j - 1])}%`, x + cellSize / 2, y + cellSize / 2);
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
                        0, 0, 512, 512,
                        x, y, cellSize, cellSize
                    );
                };
                image.src = MTUCI;
            }
        }
    }
};

export function Table(props: TableProps) {
    const { images, table, className } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            drawCanvas(canvas.current, wrapper.current.clientWidth, images, table);
        });
        resizeObserver.observe(wrapper.current);
        return () => resizeObserver.disconnect();
    }, [table]);

    useEffect(() => {
        drawCanvas(canvas.current, wrapper.current.clientWidth, images, table);
    }, [table]);

    return (
        <div
            className={classnames(cnTable, className)}
            ref={wrapper}
        >
            {/* {width <= 600 ? null : <Prompt />} */}
            <canvas
                className={cnTableCanvas}
                ref={canvas}
            />
        </div>
    );
}
