export async function selectFaces(image_ids: string[], selections: boolean[][]) {
    const data: Record<string, number> = {};
    for (let i = 0; i < image_ids.length; i++) {
        const index = selections[i].indexOf(true);
        if (index !== -1)
            data[image_ids[i]] = index;
    }

    // const result = await fetch(`http://26.113.24.68:8000/select_faces`, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ id: data })
    // });

    // if (!result.ok)
    // throw new Error('Request error');

    // const response = JSON.parse(await result.text());
    return {
        "image_ids": [
            "c47cf3c460df37eef4a2707353fb1e43",
            "ca14bf635553611d63b694654f69ac73"
        ],
        "table": [
            [
                100.00000397215393,
                50.706861622635046
            ],
            [
                50.706861622635046,
                99.99999534243894
            ]
        ]
    };
}