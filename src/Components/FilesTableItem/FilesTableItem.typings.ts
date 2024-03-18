import type { ImageFile } from '../../App';

export type FilesTableItemProps = {
    className?: string;
    image: ImageFile;
    removeImage: () => void;
    isDisabled?: boolean;
}