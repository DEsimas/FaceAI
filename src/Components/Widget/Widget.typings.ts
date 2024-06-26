import type { ReactNode } from 'react';

export type WidgetProps = {
    className?: string;
    selectedCounter?: number;
    children?: ReactNode;
    maximumFaces: number;
};
