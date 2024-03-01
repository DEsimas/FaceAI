import { FilesDict, Image } from '../../App';

export type ResultProps = {
    table: number[][];
    files: FilesDict;
    image_ids: string[];
    goBack?: () => void;
    coordinates: Record<string, Image>;
}