import React, { useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { MAXIMUM_AMOUNT_OF_SELECTED_FACES } from '../../Constants';
import { Counter } from '../Counter';
import { cnWidget, cnWidgetArrow, cnWidgetContent, cnWidgetCounter, cnWidgetHeader } from './Widget.classnames';
import type { WidgetProps } from './Widget.typings';

import Cut from './../../Assets/Cut.png';

import './Widget.scss';

export function Widget(props: WidgetProps) {
    const { className, children, selectedCounter } = props;

    const [isHidden, setIsHidden] = useState(false);

    return (
        <div
            className={classnames(cnWidget, className)}
        >
            <div
                className={cnWidgetHeader}
            >
                <h3>Таблица соответствия</h3>
                {selectedCounter ?
                    <Counter
                        className={cnWidgetCounter}
                        value={selectedCounter}
                        max={MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                    /> : null}
                <img
                    onClick={() => setIsHidden(hidden => !hidden)}
                    alt={isHidden ? 'show' : 'hide'}
                    style={{
                        transform: isHidden ? 'rotate(180deg)' : 'rotate(270deg)',
                        transition: 'transform 150ms ease'
                    }}
                    width={35}
                    src={Cut}
                    className={cnWidgetArrow}
                />
            </div>
            <div 
                className={cnWidgetContent}
                style={{ display: isHidden ? 'none' : 'block' }}
            >
                {children}
            </div>
        </div>
    );
}
