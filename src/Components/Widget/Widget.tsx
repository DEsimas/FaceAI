import React, { useState } from 'react';
import { classnames } from '@bem-react/classnames';
import useWidth from '../../Hooks/UseWidth';
import { Counter } from '../Counter';
import { cnWidget, cnWidgetArrow, cnWidgetContent, cnWidgetCounter, cnWidgetHeader } from './Widget.classnames';
import type { WidgetProps } from './Widget.typings';

import Cut from './../../Assets/Cut.png';

import './Widget.scss';

export function Widget(props: WidgetProps) {
    const { className, children, selectedCounter, maximumFaces } = props;

    const [isHidden, setIsHidden] = useState(false);

    const width = useWidth();

    return (
        <div
            className={classnames(cnWidget, className)}
        >
            <div
                className={cnWidgetHeader}
                onClick={
                    width <= 600 ?
                        () => setIsHidden(hidden => !hidden) : undefined
                }
                onDoubleClick={
                    width <= 600 ?
                        undefined : () => setIsHidden(hidden => !hidden)
                }
                style={{
                    // cursor: width < 600 ? 'default' : 'move'
                }}
            >
                <div>
                    {width >= 600 ?
                        <h3>Таблица соответствия</h3> : null
                    }
                    {selectedCounter ?
                        <Counter
                            className={cnWidgetCounter}
                            value={selectedCounter}
                            max={maximumFaces}
                        /> : null}
                </div>
                <img
                    onClick={
                        width <= 600 ?
                            undefined : () => setIsHidden(hidden => !hidden)
                    }
                    alt={isHidden ? 'show' : 'hide'}
                    style={{
                        transform: isHidden ? width <= 600 ? 'rotate(270deg)' : 'rotate(180deg)' : 'rotate(90deg)',
                        transition: 'transform 150ms ease'
                    }}
                    width={35}
                    src={Cut}
                    className={cnWidgetArrow}
                    draggable={false}
                />
            </div>
            <div
                className={cnWidgetContent}
                style={{ display: isHidden ? 'none' : 'block' }}
            >
                {children}
            </div>
        </div >
    );
}
