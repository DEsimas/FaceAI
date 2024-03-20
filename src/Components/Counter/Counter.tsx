import React from 'react';
import { classnames } from '@bem-react/classnames';
import { declOfNum } from '../../Utils/declOfNum';
import { cnCounter, cnCounterText } from './Counter.classnames';
import type { CounterProps } from './Counter.typings';

import './Counter.scss';

export function Counter(props: CounterProps) {
    const { className, value, max } = props;

    return (
        <div className={classnames(cnCounter, className)}>
            <div className={cnCounterText}>{`Выбрано ${value} ${declOfNum(value, ['лицо', 'лица', 'лиц'])} из ${max} возможных`}</div>
        </div>
    );
}
