import { Coordinates } from "../../App";

export type LoadFilesProps = {
    files: File[];
    nextStage: (coordinates: CoordinatesResponse) => void;
}

export type CoordinatesResponse = {
    files: File[];
    coordinates: Coordinates;
    image_ids: string[];
}

export type ServerResponse = {
    image_ids: string[];
    bboxes: [number, number, number, number][][];
}

export type PageError = {
    id: string;
    text: string;
}