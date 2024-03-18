import { fileToBase64 } from './fileToBase64';

export async function isEqualFiles(file1: File, file2: File) {
  if(file1.size !== file2.size)
    return false;
  return await fileToBase64(file1) === await fileToBase64(file2);
}