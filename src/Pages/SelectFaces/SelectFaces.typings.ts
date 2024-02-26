export type SelectFacesProps = {
    files: File[];
    coordinates: Array<[number, number]>;
    previousStage: () => void;
}