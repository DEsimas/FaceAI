import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnMessage, cnMessageCloseBtn } from './Message.classnames';
import type { MessageProps } from './Message.typings';

import './Message.scss';

export function Message(props: MessageProps) {
    const { text, className, onClose } = props;

    return (
        <div className={classnames(cnMessage, className)}>
            <button
                onClick={onClose}
                className={cnMessageCloseBtn}
            >
                ❌
            </button>
            <span>
                {text}
            </span>
        </div>
    );
}