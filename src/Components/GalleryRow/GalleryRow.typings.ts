import type { Item } from '../Gallery/Gallery.typings';

export type GalleryRowProps = {
    className?: string;
    items: Item[];
    width: number;
};
