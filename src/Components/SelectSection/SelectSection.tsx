import React from 'react';
import { classnames } from '@bem-react/classnames';
import { Header } from '../../Components/Header';
import { FilesList } from '../../Components/FilesList';
import { cnSelectSection, cnSelectSectionHeader, cnSelectSectionList } from './SelectSection.classnames';
import type { SelectFacesProps } from './SelectSection.typings';

import './SelectSection.scss';

export function SelectSection(props: SelectFacesProps) {
    const { className, images, selectFace } = props;

    return (
        <div className={classnames(cnSelectSection, className)}>
            <Header
                text='Выберите лица для сравнения'
                className={cnSelectSectionHeader}
            />
            <FilesList
                className={cnSelectSectionList}
                images={images}
                selectFace={selectFace}
            />
        </div>
    );
}