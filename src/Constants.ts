export const URL = process.env.URL;
export const USE_MOCK = Boolean(process.env.USE_MOCK);
export const MAXIMUM_AMOUNT_OF_SELECTED_FACES = window.innerWidth <= 420 ? 5 : 10;
export const MAXIMUM_FILE_SIZE_BYTES = 20000000; // 20 мбайт
export const ALLOWED_FILE_EXTENSIONS =
    ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'jpe', 'jif', 'jfif', 'pjpeg', 'pjp', 'heic'];
export const DISABLE_WIDGET = true;
