import { Image } from "../../App";

export type FilesListItemProps = {
    file: File;
    imageCoordinates: Image;
    selection?: boolean[];
    className?: string;
    disabled?: boolean;
}

export type Size = {
    height: number;
    width: number;
}

export type Offset = {
    top: number;
    left: number;
}