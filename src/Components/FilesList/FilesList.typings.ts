import type { ImageFiles, SelectFace } from '../../App';

export type FilesListProps = {
    className?: string;
    images: ImageFiles;
    selectFace: SelectFace;
    disabled?: boolean;
};