import type { DragEvent } from 'react';

export type DragAndDropZoneIdleProps = {
    showText?: boolean;
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void;
    className?: string;
}
