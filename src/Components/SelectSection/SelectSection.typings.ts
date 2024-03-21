import type { ImageFiles, RemoveImage, SelectFace } from '../../App';

export type SelectFacesProps = {
    className?: string;
    images: ImageFiles;
    selectFace: SelectFace;
    removeImage: RemoveImage;
    disabled?: boolean;
};
