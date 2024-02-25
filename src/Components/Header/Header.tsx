import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnHeader } from './Header.classnames';
import type { HeaderProps } from './Header.typings';

import './Header.scss';

export function Header(props: HeaderProps) {
    const { text, className } = props;

    return (
        <h1 className={classnames(cnHeader, className)}>
            {text}
        </h1>
    );
}