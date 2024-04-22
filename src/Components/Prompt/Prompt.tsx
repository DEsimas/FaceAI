import React, { useRef, useState } from 'react';
import { classnames } from '@bem-react/classnames';
import { cnPromptIcon, cnPromptImage, promptTextCn } from './Prompt.classnames';

import Question from './../../Assets/Question.png';

import './Prompt.scss';

export function Prompt() {
    const [isHovering, setIsHovering] = useState(false);

    const content = useRef<HTMLDivElement>();

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <>
            <div
                ref={content}
                className={classnames(promptTextCn({isHovering}))}
            >
                В таблице описано сходство лиц друг с другом в процентах.<br/>Зелёный цвет — скорее всего это один и тот же человек.<br/>Оранжевый — лица похожи.<br/>Красный — лица не похожи
            </div>
            <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={cnPromptIcon}>
                <img
                    className={cnPromptImage}
                    src={Question}
                    draggable={false}
                />
            </div>
        </>
    );
}
