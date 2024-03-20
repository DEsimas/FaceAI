import React, { useEffect, useRef } from 'react';
import { classnames } from '@bem-react/classnames';
import { MAXIMUM_AMOUNT_OF_SELECTED_FACES } from '../../Constants';
import { cnTable, cnTableCanvas } from './Table.classnames';
import type { SubImage, TableProps } from './Table.typings';

import './Table.scss';

export function Table(props: TableProps) {
    const { images, table, className } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

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
        const gapSize = 5;
        const cellSize = (size - gapSize * (amount - 2)) / amount;
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.width = size;
        ctx.canvas.height = size;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.max(50 * (1 - amount / MAXIMUM_AMOUNT_OF_SELECTED_FACES), 16)}px Arial`;
        for (let i = 0; i < amount; i++) {
            for (let j = 0; j < amount; j++) {
                const y = i * cellSize + gapSize * (i - 1);
                const x = j * cellSize + gapSize * (j - 1);
                if (i !== 0 && j !== 0) {
                    const matchPercentage = (table[i - 1][j - 1] - 50) * 0.02;
                    ctx.fillStyle = `rgba(${255 * (1 - matchPercentage)}, ${255 * matchPercentage}, 1)`;
                    ctx.fillRect(x, y, cellSize, cellSize);
                    ctx.fillStyle = 'black';
                    ctx.fillText(`${Math.round(table[i - 1][j - 1] * 100) / 100}%`, x + cellSize / 2, y + cellSize / 2);
                } else if (j !== i) {
                    const subImage = i === 0 ? subImages[j - 1] : subImages[i - 1];
                    const image = new Image();
                    image.onload = () => {
                        const width = subImage.face[1][0] - subImage.face[0][0];
                        const height = subImage.face[1][1] - subImage.face[0][1];
                        const ratio = cellSize / Math.max(width, height);
                        const dx = width * ratio;
                        const dy = height * ratio;
                        ctx.drawImage(
                            image,
                            subImage.face[0][0],
                            subImage.face[0][1],
                            width,
                            height,
                            x + (cellSize - dx) / 2,
                            y + (cellSize - dy) / 2,
                            dx,
                            dy
                        );
                    };
                    image.src = subImage.url;
                }
            }
        }
    }, [table, images]);

    return (
        <div
            className={classnames(cnTable, className)}
            ref={wrapper}
        >
            <canvas
                className={cnTableCanvas}
                ref={canvas}
            />
        </div>
    );
}
