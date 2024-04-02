import React, { useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnWidget, cnWidgetArrow, cnWidgetContent, cnWidgetCounter, cnWidgetHeader } from './Widget.classnames';
import type { WidgetProps } from './Widget.typings';

import Cut from './../../Assets/Cut.png';

import './Widget.scss';
import { Counter } from '../Counter';
import { MAXIMUM_AMOUNT_OF_SELECTED_FACES } from '../../Constants';

export function Widget(props: WidgetProps) {
    const { className, children, selectedCounter } = props;

    const [isHidden, setIsHidden] = useState(false);

    return (
        <div
            className={classnames(cnWidget, className)}
            style={{ height: isHidden ? '50px' : '705px' }}
        >
            <div
                className={cnWidgetHeader}
                onClick={() => setIsHidden(flag => !flag)}
            >
                <h3>Таблица соответствия</h3>
                {selectedCounter ?
                    <Counter
                        className={cnWidgetCounter}
                        value={selectedCounter}
                        max={MAXIMUM_AMOUNT_OF_SELECTED_FACES}
                    /> : null}
                <img
                    alt={isHidden ? 'show' : 'hide'}
                    style={{
                        transform: isHidden ? 'rotate(180deg)' : 'rotate(90deg)',
                        transition: 'transform 150ms ease'

                    }}
                    width={35}
                    src={Cut}
                    className={cnWidgetArrow}
                />
            </div>
            <div className={cnWidgetContent}>
                {children}
            </div>
        </div>
    );
}
