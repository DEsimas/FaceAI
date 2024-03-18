export type ImageFiles = ImageFile[];

export type ImageFile = {
  file: File;
  url: string;
  localId: string;
  serverId?: string;
  faces?: FacesCoordinates[]
};

export type AddImages = (newImages: ImageFile[]) => Promise<void>;

export type RemoveImage = (id: string) => void;

export type FacesCoordinates = Rectangle[];

export type Rectangle = [Point, Point];

export type Point = [number, number];

// deprecated

export type AppState = 'Load' | 'Select' | 'Results';

export type Coordinates = Image[];

export type Image = Rectangle[];

export type FilesDict = Record<string, File>;

// dprecated