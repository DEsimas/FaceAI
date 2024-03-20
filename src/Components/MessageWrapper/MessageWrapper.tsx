import React from 'react';
import { cnMessageWrapper } from './MessageWrapper.classnames';
import type { MessageWrapperProps } from './MessageWrapper.typings';

import './MessageWrapper.scss';

export function MessageWrapper(props: MessageWrapperProps) {
    const { children } = props;
    return (
        <div className={cnMessageWrapper}>
            {children}
        </div>
    );
}
