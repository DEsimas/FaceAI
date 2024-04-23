import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnHeader, cnHeaderImage, cnHeaderSpan } from './Header.classnames';
import type { HeaderProps } from './Header.typings';

import Logo from './../../Assets/Logo.svg';

import './Header.scss';

export function Header(props: HeaderProps) {
    const { className } = props;

    return (
        <div className={classnames(cnHeader, className)} >
            <img
                src={Logo}
                className={cnHeaderImage}
                draggable={false}
            />
            <h1
                className={cnHeaderSpan}
            >
                Сравнение лиц на фотографиях
            </h1>
        </ div>
    );
}
