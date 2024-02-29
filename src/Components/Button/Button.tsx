import React from 'react';
import { classnames } from '@bem-react/classnames';
import { buttonCn, cnButton } from './Button.classnames';
import type { ButtonProps } from './Button.typings';

import './Button.scss';

export function Button(props: ButtonProps) {
    const { className, onClick, type = 'default', isLoading, z_index } = props;
    const text = type === 'close' ? '❌' : props.text;

    return (
        <button
            className={classnames(cnButton, className, buttonCn({ type, isLoading }))}
            onClick={onClick}
            disabled={isLoading}
            style={{ zIndex: z_index }}
        >
            {text}
        </button>
    );
}