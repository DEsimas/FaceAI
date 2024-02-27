import type { CoordinatesResponse } from "./LoadFiles.typings";

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
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

export async function fetchCoordinates(files: File[]): Promise<CoordinatesResponse> {
    const data = await files.map(async (file) => await toBase64(file));
    // fetch(`http://26.113.24.68:8000/upload_images`, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ "data": data })
    // }).then(console.log).catch(console.log);

    return {
        files,
        coordinates: [
            [[[649, 153], [1180, 957]]],
            [[[333, 201], [376, 255]], [[500, 331], [553, 369]], [[635, 180], [680, 240]]],
            [],
            [[[510, 172], [1126, 1104]]]
        ]
    }
}