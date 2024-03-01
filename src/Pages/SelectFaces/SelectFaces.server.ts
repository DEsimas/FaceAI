import { URL } from "../../Constants";

export async function selectFaces(image_ids: string[], selections: boolean[][]) {
    const data: Record<string, number> = {};
    for (let i = 0; i < image_ids.length; i++) {
        const index = selections[i].indexOf(true);
        if (index !== -1)
            data[image_ids[i]] = index;
    }

    const result = await fetch(`${URL}/select_face`, {
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
    return { ...response, selected: data };
}