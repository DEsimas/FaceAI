import { Image } from "../../App";

export type FilesListItemProps = {
    file: File;
    imageCoordinates: Image;
}

export type Size = {
    height: number;
    width: number;
}

export type Offset = {
    top: number;
    left: number;
}