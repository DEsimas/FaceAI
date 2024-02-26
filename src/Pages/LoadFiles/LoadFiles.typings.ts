import { Coordinates } from "../../App";

export type LoadFilesProps = {
    files: File[];
    nextStage: (coordinates: CoordinatesResponse) => void;
}

export type CoordinatesResponse = {
    files: File[];
    coordinates: Coordinates;
}