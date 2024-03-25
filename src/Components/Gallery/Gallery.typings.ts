import type { ReactNode } from 'react';

export type GalleryProps = {
    className?: string;
    items: Item[];
};

export type Item = {
    id: string;
    width: number;
    height: number;
    element: ReactNode;
};
