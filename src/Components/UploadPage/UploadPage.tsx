import React from 'react';
import type { UploadPageProps } from './UploadPage.typings';
import { classnames } from '@bem-react/classnames';
import { cnUploadPage, cnUploadPageButton, cnUploadPageContent, cnUploadPageText } from './UploadPage.classnames';

import './UploadPage.scss';
import { UploadButton } from '../UploadButton';

export function UploadPage(props: UploadPageProps) {
    const { addImages, className } = props;

    return (
        <div
            className={classnames(className, cnUploadPage)}
        >
            <div
                className={cnUploadPageContent}
            >
                <span
                    className={cnUploadPageText}
                >Для начала загрузите ваши изображения, можете просто перетащить их на страницу</span>
                <UploadButton
                    addImages={addImages}
                    className={cnUploadPageButton}
                />
            </div>
        </div>
    );
}
