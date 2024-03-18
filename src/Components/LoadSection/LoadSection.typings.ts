import type { AddImages, Coordinates, ImageFiles, RemoveImage } from '../../App';

export type LoadSectionProps = {
    images: ImageFiles;
    addImages: AddImages;
    removeImage: RemoveImage;
};

// deprecated

export type CoordinatesResponse = {
    files: File[];
    coordinates: Coordinates;
    image_ids: string[];
};

export type ServerResponse = {
    image_ids: string[];
    bboxes: [number, number, number, number][][];
};

export type PageError = {
    id: string;
    text: string;
};

// deprecated