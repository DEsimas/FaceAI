import type { ImageFiles, Rectangle } from '../../App';

export type TableProps = {
    className?: string;
    images: ImageFiles;
    table: number[][];
};

export type SubImage = {
    url: string;
    face: Rectangle;
};
