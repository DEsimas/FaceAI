import React, { useCallback, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnDragAndDropZone, cnDragAndDropZoneActive, cnDragAndDropZoneIdle, cnDragAndDropZoneInput, cnDragAndDropZonePreview } from './DragAndDropZone.classnames';
import { DragAndDropZoneIdle } from '../DragAndDropZoneIdle';
import { DragAndDropZoneActive } from '../DragAndDropZoneActive';
import type { DragAndDropZoneProps } from './DragAndDropZone.typings';

import './DragAndDropZone.scss';
import { FilesTable } from '../FilesTable';
import { FileInput } from '../FileInput';

export function DragAndDropZone(props: DragAndDropZoneProps) {
    const { className, files, removeFile, addFiles, addError } = props;

    const [drag, setDrag] = useState(false);

    const dragStartHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }, [setDrag]);

    const dragLeaveHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }, [setDrag]);

    const dragDropHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        addFiles(e.dataTransfer.files);
        setDrag(false);
    }, [setDrag, addError]);

    return (
        <div className={classnames(cnDragAndDropZone, className)}>
            {drag ?
                <DragAndDropZoneActive
                    className={cnDragAndDropZoneActive}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDragStart={dragStartHandler}
                    onDrop={dragDropHandler}
                /> :
                <DragAndDropZoneIdle
                    className={cnDragAndDropZoneIdle}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDragStart={dragStartHandler}
                    showText={files.length === 0}
                />
            }
            {files.length ?
                <FilesTable
                    className={cnDragAndDropZonePreview}
                    files={files}
                    removeFile={removeFile}
                    isDisabled={drag}
                /> : null}
            <FileInput
                addFiles={addFiles}
                className={cnDragAndDropZoneInput}
                z_index={drag ? 0 : 2}
            />
        </div>
    )
}