import React from 'react';
import { Button } from '../../Components/Button';
import { Header } from '../../Components/Header';
import { FilesList } from '../../Components/FilesList';
import { cnSelectFaces, cnSelectFacesBack, cnSelectFacesList, cnSelectFacesSelect } from './SelectFaces.classnames';
import type { SelectFacesProps } from './SelectFaces.typings';

import './SelectFaces.scss';

export function SelectFaces(props: SelectFacesProps) {
    const { files, coordinates, previousStage } = props;

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
            />
            <Button
                className={cnSelectFacesSelect}
                text='Сравнить'
            />
        </div>
    );
}