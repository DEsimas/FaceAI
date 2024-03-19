import type { FacesCoordinatesWithId, ImageFiles, SelectFacesRquestBody, ServerRectangle, Table, UploadImagesResponse } from '../App';
import { URL } from '../Constants';
import { fileToBase64 } from '../Utils/fileToBase64';

export async function uploadImages(images: ImageFiles): Promise<FacesCoordinatesWithId[]> {
    const body = {
        data: await Promise.all(images.map(image => fileToBase64(image.file)))
    };
    const response = await fetch(`${URL}/upload_images`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        // todo обработка падения
        throw new Error('Запрос не прошел');
    }
    const payload: UploadImagesResponse = JSON.parse(await response.text());
    const result: FacesCoordinatesWithId[] = [];
    for (let i = 0; i < payload.image_ids.length; i++) {
        result.push({
            localId: images[i].localId,
            serverId: payload.image_ids[i],
            faces: payload.bboxes[i].map((face: ServerRectangle) => [[face[0], face[1]], [face[2], face[3]]])
        });
    }
    return result;
}

export async function selectFaces(images: ImageFiles): Promise<Table> {
    const body: SelectFacesRquestBody = {
        id: {}
    };
    images.forEach(image => body.id[image.serverId] = image.selectedIndexes);
    const response = await fetch(`${URL}/select_faces`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        // todo обработка падения
        throw new Error('Запрос не прошел');
    }
    const payload: { table: number[][] } = JSON.parse(await response.text());
    const table: Table = {
        names: images.filter(image => image.selectedIndexes.length !== 0).map(image => image.file.name),
        values: payload.table
    };
    return table;
}
