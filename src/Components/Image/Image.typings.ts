import type { ImageFile } from '../../App';

export type ImageProps = {
    className?: string;
    image: ImageFile;
    selectFace?: (index: number) => void;
    fullscreenImage?: () => void;
    removeImage?: () => void;
    disabled?: boolean;
    selectedIndexes: number[];
    hideButtons?: boolean;
    isLoading?: boolean;
    modalOffset?: boolean;
};

export type Size = {
    height: number;
    width: number;
};

export type Offset = {
    top: number;
    left: number;
};
