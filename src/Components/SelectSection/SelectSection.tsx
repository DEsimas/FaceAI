import React from 'react';
import { classnames } from '@bem-react/classnames';
import { Header } from '../../Components/Header';
import { FilesList } from '../../Components/FilesList';
import { cnSelectSection, cnSelectSectionHeader, cnSelectSectionList, cnSelectSectionPara } from './SelectSection.classnames';
import type { SelectFacesProps } from './SelectSection.typings';

import './SelectSection.scss';

export function SelectSection(props: SelectFacesProps) {
    const { className, images, selectFace, removeImage, disabled } = props;

    return (
        <div className={classnames(cnSelectSection, className)}>
            <Header
                text='Выберите лица'
                className={cnSelectSectionHeader}
            />
            <p className={cnSelectSectionPara}>Нажмите на выделенные области, чтобы выбрать лица</p>
            <FilesList
                removeImage={removeImage}
                className={cnSelectSectionList}
                images={images}
                selectFace={selectFace}
                disabled={disabled}
            />
        </div>
    );
}
