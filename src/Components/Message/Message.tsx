import React, { useEffect } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnMessage, cnMessageCloseBtn } from './Message.classnames';
import type { MessageProps } from './Message.typings';

import './Message.scss';
import { Button } from '../Button';

export function Message(props: MessageProps) {
    const { text, className, onClose } = props;

    useEffect(() => {
        setTimeout(onClose, 5000);
    }, []);

    return (
        <div className={classnames(cnMessage, className)}>
            <Button
                onClick={onClose}
                className={cnMessageCloseBtn}
                type='close'
            />
            <span>
                {text}
            </span>
        </div>
    );
}