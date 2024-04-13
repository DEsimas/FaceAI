import React, { useEffect, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { declOfNum } from '../../Utils/declOfNum';
import { cnCounter, cnCounterText } from './Counter.classnames';
import type { CounterProps } from './Counter.typings';

import './Counter.scss';

export function Counter(props: CounterProps) {
    const { className, value, max } = props;

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className={classnames(cnCounter, className)}>
            <div className={cnCounterText}>
                {width <= 420 ?
                    `${value} из ${max}` :
                    `Выбрано ${value} ${declOfNum(value, ['лицо', 'лица', 'лиц'])} из ${max} возможных`
                }
            </div>
        </div>
    );
}
