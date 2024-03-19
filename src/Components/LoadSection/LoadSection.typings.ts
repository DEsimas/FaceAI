import type { AddImages, ImageFiles, RemoveImage } from '../../App';

export type LoadSectionProps = {
    className?: string;
    images: ImageFiles;
    addImages: AddImages;
    removeImage: RemoveImage;
};
