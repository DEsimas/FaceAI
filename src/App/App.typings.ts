export type ImageFiles = ImageFile[];

export type ImageFile = {
  file: File;
  url: string;
  localId: string;
  resolution: Resolution;
  serverId?: string;
  faces?: FacesCoordinates;
  selectedIndexes?: number[];
};

export type Resolution = {
  height: number;
  width: number;
};

export type AddImages = (newImages: ImageFile[]) => Promise<void>;

export type RemoveImage = (id: string) => void;

export type FacesCoordinates = Rectangle[];

export type Rectangle = [Point, Point];

export type Point = [number, number];

export type UploadImagesResponse = {
  bboxes: ServerFacesCoordinates[];
  image_ids: string[];
}

export type ServerFacesCoordinates = ServerRectangle[];

export type ServerRectangle = [number, number, number, number];

export type FacesCoordinatesWithId = {
  localId: string;
  serverId: string;
  faces: FacesCoordinates;
};

// deprecated

export type Coordinates = Image[];

export type Image = Rectangle[];

export type FilesDict = Record<string, File>;

// dprecated