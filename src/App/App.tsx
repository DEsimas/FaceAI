import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import { ALLOWED_FILE_EXTENSIONS, MAXIMUM_AMOUNT_OF_SELECTED_FACES, MAXIMUM_FILE_SIZE_BYTES } from '../Constants';
import { isEqualFiles } from '../Utils/compareFiles';
import { singularOrPlural } from '../Utils/singularOrPlural';
import { getImageResolution } from '../Utils/getImageResolution';
import { Counter } from '../Components/Counter';
import { Message } from '../Components/Message';
import { MessageWrapper } from '../Components/MessageWrapper';
import { DragAndDrop } from '../Components/DragAndDrop';
import { Gallery } from '../Components/Gallery';
import { uploadImages } from './App.server';
import { cnApp, cnAppCounter, cnAppDragAndDrop, cnAppHeader } from './App.classnames';
import type { ImageFiles, Error } from './App.typings';

import './App.scss';

export function App() {
    const [images, setImages] = useState<ImageFiles>([]);
    const [selectedCounter, setSelectedCounter] = useState(0);
    const [errors, setErrors] = useState<Error[]>([]);

    const addImages = useCallback(async (newImages: File[]) => {
        const duplicatesNames: string[] = [];
        const tooLargeNames: string[] = [];
        const wrongExtensionNames: string[] = [];
        for (let i = 0; i < newImages.length; i++) {
            const newImage = newImages[i];
            if (!newImage) {
                break;
            }
            if (!ALLOWED_FILE_EXTENSIONS.includes(newImage.name.split('.').reverse()[0])) {
                wrongExtensionNames.push(newImage.name);
                newImages.splice(i, 1);
                i--;
            }
            if (newImage.size > MAXIMUM_FILE_SIZE_BYTES) {
                tooLargeNames.push(newImage.name);
                newImages.splice(i, 1);
                i--;
            }
            for (let j = i + 1; j < newImages.length; j++) {
                if (await isEqualFiles(newImage, newImages[j])) {
                    duplicatesNames.push(newImages[j].name);
                    newImages.splice(j, 1);
                    j--;
                }
            }
            for (const oldImage of images) {
                if (await isEqualFiles(newImage, oldImage.file)) {
                    duplicatesNames.push(newImage.name);
                    newImages.splice(i, 1);
                    i--;
                }
            }
        }
        if (duplicatesNames.length !== 0) {
            addError(`${singularOrPlural(duplicatesNames.length > 1, ['Файл', 'Файлы'])} ${duplicatesNames.join(', ')} уже ${singularOrPlural(duplicatesNames.length > 1, ['загружен', 'загружены'])}`);
        }
        if (tooLargeNames.length !== 0) {
            addError(`${singularOrPlural(tooLargeNames.length > 1, ['Файл', 'Файлы'])} ${tooLargeNames.join(', ')} слишком ${singularOrPlural(tooLargeNames.length > 1, ['большой', 'большие'])}`);
        }
        if (wrongExtensionNames.length !== 0) {
            addError(`${singularOrPlural(wrongExtensionNames.length > 1, ['Файл', 'Файлы'])} ${wrongExtensionNames.join(', ')} в неподдерживаемом формате`);
        }
        const filteredImages: ImageFiles = await Promise.all(newImages.map(async (file: File) => {
            const url = URL.createObjectURL(file);
            return {
                file: file,
                localId: v4(),
                url: url,
                resolution: await getImageResolution(url),
                selectedIndexes: []
            };
        }));
        setImages([...images, ...filteredImages]);
        uploadImages(filteredImages)
            .then((response) => {
                setImages(images => {
                    for (const facesData of response) {
                        const image = images.find(image => image.localId === facesData.localId);
                        image.serverId = facesData.serverId;
                        image.faces = facesData.faces;
                    }
                    return [...images];
                });
            })
            .catch(() => addError('Ошибка сервера. Попробуйте позже'));
    }, [images]);

    const removeImage = useCallback((id: string) => {
        setImages(images => {
            return images.filter(image => image.localId !== id);
        });
    }, []);

    const selectFace = useCallback((id: string, index: number) => {
        setImages(images => {
            const image = images.find(image => image.localId === id);
            const indexOf = image.selectedIndexes.indexOf(index);
            if (indexOf === -1) {
                image.selectedIndexes.push(index);
                image.selectedIndexes.sort();
                setSelectedCounter(ctr => ++ctr);
            } else {
                image.selectedIndexes.splice(indexOf, 1);
                setSelectedCounter(ctr => --ctr);
            }
            return [...images];
        });
    }, []);

    const addError = useCallback((text: string) => {
        setErrors(errors => {
            errors.push({
                id: v4(),
                text
            });
            return [...errors];
        });
    }, []);

    const removeError = useCallback((id: string) => {
        setErrors(errors => errors.filter(error => error.id !== id));
    }, []);

    return (
        <div className={cnApp}>
            {selectedCounter ?
                <Counter
                    className={cnAppCounter}
                    value={selectedCounter}
                    max={MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                /> : null}
            <MessageWrapper>
                {errors.map(error => <Message
                    key={error.id}
                    text={error.text}
                    onClose={() => removeError(error.id)} />
                )}
            </MessageWrapper>
            <h1 className={cnAppHeader}>
                FaceAI
            </h1>
            <Gallery
                items={[
                    {
                        id: '1',
                        width: 2560,
                        height: 1440,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://www.enjpg.com/img/2020/genshin-impact-4-scaled-e1603714051110.jpg)' }} />
                    },
                    {
                        id: '2',
                        width: 1920,
                        height: 1080,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://twinfinite.net/wp-content/uploads/2021/01/Genshin-Impact-2-scaled.jpg)' }} />
                    },
                    {
                        id: '3',
                        width: 3840,
                        height: 2160,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://www.gamerguides.com/assets/guides/216/keqing_genshin_impact_uhdpaper.com_4K_3.2972.jpg)' }} />
                    },
                    {
                        id: '4',
                        width: 875,
                        height: 915,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://progameguides.com/wp-content/uploads/2021/03/Genshin-Impact-Character-Ganyu.jpg)' }} />
                    },
                    {
                        id: '5',
                        width: 1280,
                        height: 1280,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://www.mobilegamer.com.br/wp-content/uploads/2020/11/genshhin-impact-atualizacao-1.2-3.jpg)' }} />
                    },
                    {
                        id: '6',
                        width: 900,
                        height: 1270,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://i.pinimg.com/originals/a3/08/4e/a3084eff8fd3032a2b233071746d19fe.png)' }} />
                    },
                    {
                        id: '7',
                        width: 1577,
                        height: 1234,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/article_images/2020/10/genshin-impact-xingqui_2.png)' }} />
                    },
                    {
                        id: '8',
                        width: 1280,
                        height: 720,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://cdn.gamerjournalist.com/primary/2021/01/Genshin-Impact-Ganyu-Talents-Constellations-and-Ascension-Materials.jpg)' }} />
                    },
                    {
                        id: '9',
                        width: 1920,
                        height: 1080,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://ftw.usatoday.com/wp-content/uploads/sites/90/2021/10/genshin-impact-traveler.jpg?resize=1024)' }} />
                    },
                    {
                        id: '10',
                        width: 1400,
                        height: 700,
                        element: <div style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(https://static2.gamerantimages.com/wordpress/wp-content/uploads/2021/01/genshin-impact-mountain.jpg)' }} />
                    },
                ]}
            />
            <DragAndDrop
                className={cnAppDragAndDrop}
                addImages={addImages}
            />
        </div>
    );
}
