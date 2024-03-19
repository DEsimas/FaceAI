import type { AddImages, ImageFiles, RemoveImage } from '../../App';

export type LoadSectionProps = {
    images: ImageFiles;
    addImages: AddImages;
    removeImage: RemoveImage;
};
