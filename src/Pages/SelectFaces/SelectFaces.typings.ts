import { Coordinates } from "../../App";

export type SelectFacesProps = {
    files: File[];
    coordinates: Coordinates;
    previousStage: () => void;
    image_ids: string[];
    nextStage?: (table: unknown) => void;
}

export type PageError = {
    id: string;
    text: string;
}

export type ServerResponse = {
    image_ids: string[];
    table: number[][];
}