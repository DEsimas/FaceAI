import { Coordinates } from "../../App";

export type SelectFacesProps = {
    files: File[];
    coordinates: Coordinates;
    previousStage: () => void;
}