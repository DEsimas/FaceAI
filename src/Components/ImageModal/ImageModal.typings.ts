import type { ImageFile } from './../../App';

export type ImageModalProps = {
    image: ImageFile;
    className?: string;
    onClose: () => void;
    selectFace: (index: number) => void;
    selectedCounter: number;
};
