import React from 'react';
import type { SelectFacesProps } from './SelectFaces.typings';
import { Button } from '../../Components/Button';
import { Header } from '../../Components/Header';
import { FilesList } from '../../Components/FilesList';

export function SelectFaces(props: SelectFacesProps) {
    const { files, coordinates, previousStage } = props;

    return (
        <div>
            <Button
                text='Назад'
                onClick={previousStage}
            />
            <Header
                text='Выберите лица для сравнения'
            />
            <FilesList
                files={files}
            />
            <Button
                text='Сравнить'
            />
        </div>
    );
}