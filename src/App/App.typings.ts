export type AppState = 'Load' | 'Select' | 'Results';

export type Coordinates = Image[];

export type Image = Rectangle[];

export type Rectangle = [Point, Point];

export type Point = [number, number];

export type FilesDict = Record<string, File>;