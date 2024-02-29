import React from 'react';
import { cnFilesTable, cnFilesTableItem } from './FilesTable.classnames';
import { FilesTableItem } from '../FilesTableItem';
import type { FilesTableProps } from './FilesTable.typings';

import './FilesTable.scss';
import { classnames } from '@bem-react/classnames';

export function FilesTable(props: FilesTableProps) {
    const { files, removeFile, className, isDisabled } = props;

    return (
        <div className={classnames(cnFilesTable, className)}>
            {files.map((file: File, index) =>
                <FilesTableItem
                    className={cnFilesTableItem}
                    file={file}
                    removeFile={removeFile}
                    key={index}
                    isDisabled={isDisabled}
                />)}
        </div>
    )
}