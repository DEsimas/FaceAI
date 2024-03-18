import React from 'react';
import { Header } from '../../Components/Header';
import { FilesList } from '../../Components/FilesList';
import { cnSelectSection, cnSelectSectionHeader, cnSelectSectionList } from './SelectSection.classnames';
import type { SelectFacesProps } from './SelectSection.typings';

import './SelectSection.scss';

export function SelectSection(props: SelectFacesProps) {
    const { images } = props;

    return (
        <div className={cnSelectSection}>
            <Header
                text='Выберите лица для сравнения'
                className={cnSelectSectionHeader}
            />
            <FilesList
                className={cnSelectSectionList}
                images={images}
            />
        </div>
    );
}