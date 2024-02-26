import type { CoordinatesResponse } from "./LoadFiles.typings";

export async function fetchCoordinates(files: File[]): Promise<CoordinatesResponse> {
    console.log(files);
    return {
        files,
        coordinates: [[100, 200], [150, 200]]
    }
}