export async function selectFaces(image_ids: string[], selections: boolean[][]) {
    const data: Record<string, number> = {};
    for (let i = 0; i < image_ids.length; i++) {
        const index = selections[i].indexOf(true);
        if (index !== -1)
            data[image_ids[i]] = index;
    }

    // const result = await fetch(`${process.env.URL}/select_face`, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ id: data })
    // });

    // if (!result.ok)
    //     throw new Error('Request error');

    // const response = JSON.parse(await result.text());
    return {
        "image_ids": [
            "c47cf3c460df37eef4a2707353fb1e43",
            "ca14bf635553611d63b694654f69ac73",
            "81504c1ab79fd8748d3a673afbba02fd"
        ],
        "table": [
            [
                100.00000397215393,
                49.78885085019141,
                53.87080770172346
            ],
            [
                49.78885085019141,
                99.99999760560712,
                45.24026029064275
            ],
            [
                53.87080770172346,
                45.24026029064275,
                99.99999678884679
            ]
        ]
    };

}