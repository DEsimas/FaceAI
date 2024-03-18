import { Coordinates, Image } from "../App";
import { URL } from "../Constants";
import { fileToBase64 } from '../Utils/fileToBase64';
import type { CoordinatesResponse, ServerResponse } from "../Components/LoadSection";

export async function fetchCoordinates(files: File[]): Promise<CoordinatesResponse> {
    const data: string[] = await Promise.all(files.map(file => fileToBase64(file)));
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

export async function selectFaces(image_ids: string[], selections: boolean[][]): Promise<ServerResponse> {
    const data: Record<string, number[]> = {};
    for (let i = 0; i < image_ids.length; i++) {
        const index = selections[i].indexOf(true);
        if (index !== -1)
            data[image_ids[i]] = [index];
    }

    const result = await fetch(`${URL}/select_faces`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: data })
    });

    if (!result.ok)
        throw new Error('Request error');

    const response = JSON.parse(await result.text());
    console.log({ ...response, selected: data })
    return { ...response, selected: data };
}