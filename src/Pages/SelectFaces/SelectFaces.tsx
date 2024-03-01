import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../Components/Button';
import { Header } from '../../Components/Header';
import { FilesList } from '../../Components/FilesList';
import { Message } from '../../Components/Message';
import { MessageWrapper } from '../../Components/MessageWrapper';
import { selectFaces } from './SelectFaces.server';
import { cnSelectFaces, cnSelectFacesBack, cnSelectFacesList, cnSelectFacesSelect } from './SelectFaces.classnames';
import type { SelectFacesProps, PageError } from './SelectFaces.typings';

import './SelectFaces.scss';

export function SelectFaces(props: SelectFacesProps) {
    const { files, coordinates, previousStage, image_ids, nextStage } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PageError[]>([])

    const selections: boolean[][] = [];
    for (const image of coordinates) {
        const file = [];
        for (const _ of image) {
            file.push(false);
        }
        selections.push(file);
    }

    const onClickHandler = useCallback(() => {
        let ctr = 0;
        for (const image of selections)
            for (const rect of image)
                if (rect)
                    ctr++;

        if (ctr < 2)
            return addError('Выбрано слишком мало лиц, отметьте хотя бы два');
        setIsLoading(true);
        selectFaces(image_ids, selections)
            .then((result) => nextStage(result))
            .catch((e) => console.log(e)/*addError('У нас что-то пошло не так, попробуйте позже')*/)
            .finally(() => setIsLoading(false));
    }, []);

    const removeError = useCallback((id: string) => {
        setErrors((prev) => {
            const n = [...prev]
            return n.filter((err) => err.id !== id);
        });
    }, [setErrors]);

    const addError = useCallback((message: string) => {
        setErrors(prev => {
            const n = [...prev];
            n.push({
                id: uuidv4(),
                text: message
            });
            return n;
        });
    }, [setErrors]);

    return (
        <div className={cnSelectFaces}>
            <Button
                className={cnSelectFacesBack}
                text='Назад'
                onClick={previousStage}
            />
            <Header
                text='Выберите лица для сравнения'
            />
            <FilesList
                className={cnSelectFacesList}
                files={files}
                coordinates={coordinates}
                selections={selections}
            />
            <Button
                className={cnSelectFacesSelect}
                text='Сравнить'
                isLoading={isLoading}
                onClick={onClickHandler}
            />
            <MessageWrapper>
                {errors.map(error => <Message
                    text={error.text}
                    onClose={() => removeError(error.id)}
                    key={error.id}
                />)}
            </MessageWrapper>
        </div>
    );
}