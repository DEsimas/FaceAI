import { FilesDict } from "../../App";

export type ResultProps = {
    table: number[][];
    files: FilesDict;
    image_ids: string[];
    goBack?: () => void;
}