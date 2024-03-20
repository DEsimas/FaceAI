export const fileToBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const result = reader.result;
        if (typeof result !== 'string')
            return reject();

        const base64String = result
            .replace('data:', '')
            .replace(/^.+,/, '');

        resolve(base64String);
    };
    reader.readAsDataURL(file);
});
