export type LoadFilesProps = {
    files: File[];
    nextStage: (coordinates: CoordinatesResponse) => void;
}

export type CoordinatesResponse = {
    files: File[];
    coordinates: Array<[number, number]>;
}