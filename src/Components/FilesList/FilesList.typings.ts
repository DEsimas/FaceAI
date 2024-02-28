import { Coordinates } from "../../App";

export type FilesListProps = {
    files: File[];
    coordinates: Coordinates;
    className?: string;
    selections?: boolean[][]
}