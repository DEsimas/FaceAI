import React, { useCallback, useEffect, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnDragAndDropBorder, cnDragAndDropMiddle, cnDragAndDropPlaceholder, cnDragAndDropText, cnDragAndDropZone } from './DragAndDrop.classnames';
import type { DragAndDropProps } from './DragAndDrop.typings';

import PlaceholderImage from './../../Assets/Placeholder.png';

import './DragAndDrop.scss';

export function DragAndDrop(props: DragAndDropProps) {
    const { className, addImages } = props;

    const [isDrag, setIsDrag] = useState(false);

    let timeout: NodeJS.Timeout | undefined;

    const dragOverHandler = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDrag(true);
        // Костыль: ивент dragover стреляет чаще, чем раз в 100 мс, чтобы в хроме все
        // работало ставим таймаут на 100 мс, который выключит режим перетаскивания,
        // но каждый раз, когда засекаем dragover, сбрасываем эотот 100 мс таймер
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setIsDrag(false);
        }, 100);
    }, []);

    const dragDropHandler = useCallback((e: DragEvent) => {
        e.preventDefault();
        addImages(Array.from(e.dataTransfer.files));
    }, [addImages]);

    useEffect(() => {
        window.addEventListener('dragover', dragOverHandler);
        window.addEventListener('drop', dragDropHandler);
        return () => {
            window.removeEventListener('dragover', dragOverHandler);
            window.removeEventListener('drop', dragDropHandler);
        };
    }, [addImages]);

    return (
        <div
            className={classnames(cnDragAndDropZone, className)}
            style={{
                display: isDrag ? 'block' : 'none'
            }}
        >
            <div className={cnDragAndDropBorder}>
                <div className={cnDragAndDropMiddle}>
                    <img
                        alt='placeholder'
                        src={PlaceholderImage}
                        className={cnDragAndDropPlaceholder}
                        draggable={false}
                    />
                    <p className={cnDragAndDropText}>Перетащите изображения сюда</p>
                </div>
            </div>
        </div >
    );
}
