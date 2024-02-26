import React from 'react';
import { cnFilesTableItemImage, cnFilesTableItem, cnFilesTableItemCross } from './FilesTableItem.classnames';
import { classnames } from '@bem-react/classnames';
import type { FilesTableItemProps } from './FilesTableItem.typings';

import './FilesTableItem.scss';

export function FilesTableItem(props: FilesTableItemProps) {
    const { file, className, removeFile } = props;

    const url = URL.createObjectURL(file);

    return (
        <div className={classnames(cnFilesTableItem, className)}>
            <button
                className={cnFilesTableItemCross}
                onClick={() => removeFile(file.name)}
            >
                ❌
            </button>
            <img
                className={cnFilesTableItemImage}
                src={url}
                alt={file.name}
            />
        </div>
    );
}