import { Coordinates, Image } from "../../App";
import { URL } from "../../Constants";
import type { CoordinatesResponse, ServerResponse } from "./LoadFiles.typings";

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
    const data: string[] = await Promise.all(files.map(file => toBase64(file)));
    const result = await fetch(`${URL}/upload_images`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "data": data })
    });

    if (!result.ok)
        throw new Error('Request error');

    const response: ServerResponse = JSON.parse(await result.text());
    const image_ids = response.image_ids;
    const bboxes = response.bboxes;
    const coordinates: Coordinates = [];

    for (const image of bboxes) {
        const img: Image = [];
        for (const box of image) {
            img.push([[box[0], box[1]], [box[2], box[3]]]);
        }
        coordinates.push(img);
    }

    return {
        files,
        coordinates: coordinates,
        image_ids
    }
}