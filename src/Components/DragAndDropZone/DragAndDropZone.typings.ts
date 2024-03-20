import type { AddImages, ImageFiles, RemoveImage } from '../../App';

export type DragAndDropZoneProps = {
    className?: string;
    images: ImageFiles;
    addImages?: AddImages;
    removeImage?: RemoveImage;
}
