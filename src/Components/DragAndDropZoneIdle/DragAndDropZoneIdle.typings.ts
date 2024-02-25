import type { DragEvent } from 'react';

export type DragAndDropZoneIdleProps = {
    files: File[];
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
    className?: string;
}
