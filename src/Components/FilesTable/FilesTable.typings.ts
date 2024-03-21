import type { AddImages, ImageFiles, RemoveImage } from '../../App';

export type FilesTableProps = {
    className?: string;
    images: ImageFiles;
    removeImage: RemoveImage;
    isDisabled?: boolean;
    addFiles: AddImages;
}
