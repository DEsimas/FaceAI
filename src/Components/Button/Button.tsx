import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnButton } from './Button.classnames';
import type { ButtonProps } from './Button.typings';

import './Button.scss';

export function Button(props: ButtonProps) {
    const { text, className, onClick } = props;

    return (
        <button
            className={classnames(cnButton, className)}
            onClick={onClick}
        >
            {text}
        </button>
    );
}