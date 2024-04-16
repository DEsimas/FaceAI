import React from 'react';
import type { ImageButtonsProps } from './ImageButtons.typings';
import { classnames } from '@bem-react/classnames';
import { cnImageButtons, cnImageButtonsImage, cnImageButtonsItem } from './ImageButtons.classnames';

import './ImageButtons.scss';

import Fullscreen from './../../Assets/Fullscreen.png';
import Close from './../../Assets/Close.png';

export function ImageButtons(props: ImageButtonsProps) {
    const { removeImage, className, fullscreenImage } = props;

    return (
        <div className={classnames(cnImageButtons, className)}>
            <button
                className={cnImageButtonsItem}
                onClick={fullscreenImage ? fullscreenImage : null}
            >
                <img
                    className={cnImageButtonsImage}
                    src={Fullscreen}
                    draggable={false}
                />
            </button>
            <button
                className={cnImageButtonsItem}
            >
                <img
                    onClick={removeImage}
                    className={cnImageButtonsImage}
                    src={Close}
                    draggable={false}
                />
            </button>
        </div>
    );
}
