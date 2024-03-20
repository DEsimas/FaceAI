import type { ImageFiles, SelectFace } from '../../App';

export type SelectFacesProps = {
    className?: string;
    images: ImageFiles;
    selectFace: SelectFace;
    disabled?: boolean;
};
