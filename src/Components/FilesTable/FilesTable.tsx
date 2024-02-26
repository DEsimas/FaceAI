import React from 'react';
import { cnFilesTable, cnFilesTableItem } from './FilesTable.classnames';
import { FilesTableItem } from '../FilesTableItem';
import type { FilesTableProps } from './FilesTable.typings';

import './FilesTable.scss';

export function FilesTable(props: FilesTableProps) {
    const { files, removeFile } = props;

    return (
        <div className={cnFilesTable}>
            {files.map((file: File) =>
                <FilesTableItem
                    className={cnFilesTableItem}
                    file={file}
                    removeFile={removeFile}
                    key={file.name}
                />)}
        </div>
    )
}