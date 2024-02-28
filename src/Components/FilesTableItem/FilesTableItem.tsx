import React from 'react';
import { cnFilesTableItemImage, cnFilesTableItem, cnFilesTableItemCross } from './FilesTableItem.classnames';
import { classnames } from '@bem-react/classnames';
import type { FilesTableItemProps } from './FilesTableItem.typings';

import './FilesTableItem.scss';
import { Button } from '../Button';

export function FilesTableItem(props: FilesTableItemProps) {
    const { file, className, removeFile } = props;

    const url = URL.createObjectURL(file);

    return (
        <div className={classnames(cnFilesTableItem, className)}>
            <Button
                className={cnFilesTableItemCross}
                onClick={() => removeFile(file.name)}
                type='close'
            />
            <img
                className={cnFilesTableItemImage}
                src={url}
                alt={file.name}
            />
        </div>
    );
}