import type { ImageFiles, SelectFace } from '../../App';

export type ImageViewerProps = {
    className?: string;
    images: ImageFiles;
    selectFace: SelectFace;
    disabled?: boolean;
};
