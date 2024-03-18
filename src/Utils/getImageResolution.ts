import type { Resolution } from '../App';

export const getImageResolution = (url: string) => new Promise<Resolution>((resolve, reject) => {
  const img = new Image;
  img.onload = function () {
    resolve({ width: img.width, height: img.height });
  };
  img.src = url;
});