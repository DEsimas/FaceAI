export const MAXIMUM_AMOUNT_OF_FILES = Number(process.env.MAXIMUM_AMOUNT_OF_FILES) || 10;
export const MAXIMUM_FILE_SIZE_BYTES = Number(process.env.MAXIMUM_FILE_SIZE_BYTES) || 268435456;
export const ALLOWED_FILE_EXTENSIONS: string[] = process.env.ALLOWED_FILE_EXTENSIONS ? process.env.ALLOWED_FILE_EXTENSIONS.split(',') : ['png', 'jpg', 'jpeg'];
export const URL = process.env.URL || 'http://localhost:9000';