import type { ImageFiles, SelectFacesResponse } from '../App';

export function mockSelectFaces(images: ImageFiles): SelectFacesResponse {
    const size = images.reduce((ctr, image)=> ctr+=image.selectedIndexes.length, 0);
    const dummyTable: number[][] =
        [
            [92.26, 46.47, 94.62, 66.78, 65.63, 68.78, 64.21, 54.79, 41.03, 93],
            [90.85, 69.54, 59.68, 58.82, 53.6, 70.63, 42.35, 92.01, 57.9, 83.94],
            [56.64, 61.17, 42.48, 94.26, 63.96, 75.24, 88.42, 58.44, 63.34, 81.5],
            [82.73, 61.44, 80.91, 40.65, 76.2, 62.79, 97.65, 86.67, 42.97, 54.14],
            [50.05, 78.56, 41.07, 69.46, 89.14, 62.77, 84.03, 67.33, 90.31, 94.48],
            [40.15, 55.05, 64.7, 63.1, 93.62, 82.71, 69.65, 97.19, 93.59, 74.34],
            [43.54, 68.06, 77.66, 52.88, 66.34, 81.8, 74.5, 78.13, 85.44, 85.93],
            [51.44, 62.53, 75.07, 67.25, 47.17, 44.13, 58.8, 78.53, 66.91, 60.77],
            [96.07, 71.98, 85.2, 65.43, 65.04, 61.4, 77.14, 89.83, 84.03, 84.62],
            [75.86, 99.81, 72.24, 47.04, 52.52, 72.43, 59.42, 85.99, 78.42, 71.57],
        ];
    dummyTable.splice(size);
    for(const row of dummyTable)
        row.splice(size);
    return {
        images,
        table: dummyTable,
    };
}
