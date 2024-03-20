import type { ImageFile } from '../../App';

export type FilesListItemProps = {
    className?: string;
    image: ImageFile;
    selectFace?: (index: number) => void;
    disabled?: boolean;
};

export type Size = {
    height: number;
    width: number;
};

export type Offset = {
    top: number;
    left: number;
};
