import type { CoordinatesResponse } from "./LoadFiles.typings";

export async function fetchCoordinates(files: File[]): Promise<CoordinatesResponse> {
    console.log(files);
    return {
        files,
        coordinates: [
            [[[50, 50], [100, 100]], [[100, 100], [50, 50]]],
            [],
            [[[0, 150], [150, 150]]],
            [[[100, 50], [100, 120]], [[60, 80], [130, 120]], [[0, 0], [100, 120]]]
        ]
    }
}