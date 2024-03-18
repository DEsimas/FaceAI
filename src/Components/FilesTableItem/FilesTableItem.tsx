import React from 'react';
import { classnames } from '@bem-react/classnames';
import { Button } from '../Button';
import { cnFilesTableItemImage, cnFilesTableItem, cnFilesTableItemCross } from './FilesTableItem.classnames';
import type { FilesTableItemProps } from './FilesTableItem.typings';

import './FilesTableItem.scss';

export function FilesTableItem(props: FilesTableItemProps) {
    const { className, image, removeImage, isDisabled } = props;

    return (
        <div className={classnames(cnFilesTableItem, className)}>
            <Button
                className={cnFilesTableItemCross}
                onClick={removeImage}
                type='close'
                z_index={isDisabled ? 0 : 2}
            />
            <img
                className={cnFilesTableItemImage}
                src={image.url}
                alt={image.file.name}
            />
        </div>
    );
}