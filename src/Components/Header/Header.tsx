import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnHeader, cnHeaderLine, cnHeaderSpan } from './Header.classnames';
import type { HeaderProps } from './Header.typings';

import './Header.scss';

export function Header(props: HeaderProps) {
    const { className, isLoaded } = props;

    return (
        <div className={classnames(cnHeader, className)} >
            <h1 >
                FaceAI
            </ h1>
            <p className={cnHeaderSpan}>
                {isLoaded ? 'Выберите лица для сравнения или загрузите больше фотографий' : 'Перетащите фотографии для загрузки'}
            </p>
            <div className={cnHeaderLine} />
        </ div>
    );
}
