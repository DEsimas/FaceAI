import React from 'react';
import { useBus } from 'react-bus';
import { classnames } from '@bem-react/classnames';
import { cnResetWidgetButton } from './ResetWidgetButton.classnames';
import type { ResetWidgetButtonProps } from './ResetWidgetButton.typings';

import './ResetWidgetButton.scss';

export function ResetWidgetButton(props: ResetWidgetButtonProps) {
    const { className } = props;

    // Чтобы при нажатии на кнопку позиция сбросилась, используется react-bus
    // Принимающая часть в компоненте TableWidget
    const bus = useBus();

    return (
        <button
            className={classnames(className, cnResetWidgetButton)}
            onClick={() => bus.emit('reset-widget')}
        >
            Сбросить позицию виджета
        </button>
    );
}
