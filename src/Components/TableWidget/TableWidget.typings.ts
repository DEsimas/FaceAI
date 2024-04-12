import type { ImageFiles } from '../../App';

export type TableWIdgetProps = {
    images: ImageFiles;
    table: number[][];
    selectedCounter?: number;
};
