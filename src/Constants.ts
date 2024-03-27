export const MAXIMUM_AMOUNT_OF_SELECTED_FACES = Number(process.env.MAXIMUM_AMOUNT_OF_SELECTED_FACES) || 10;
export const MAXIMUM_FILE_SIZE_BYTES = Number(process.env.MAXIMUM_FILE_SIZE_BYTES) || 268435456;
export const ALLOWED_FILE_EXTENSIONS: string[] = process.env.ALLOWED_FILE_EXTENSIONS ? process.env.ALLOWED_FILE_EXTENSIONS.split(',') : ['png', 'jpg', 'jpeg'];
export const URL = process.env.URL || 'http://localhost:9000';
export const MAX_IMAGE_HEIGHT = Number(process.env.MAX_IMAGE_HEIGHT) || 500;
export const MIN_IMAGE_HEIGHT = Number(process.env.MIN_IMAGE_HEIGHT) || 300;
