import React from 'react';
import { cnFilesTable, cnFilesTableItem } from './FilesTable.classnames';
import type { FilesTableProps } from './FilesTable.typings';

import './FilesTable.scss';

export function FilesTable(props: FilesTableProps) {
    const { files } = props;

    return (
        <div className={cnFilesTable}>
            {files.map((file: File) => {
                const url = URL.createObjectURL(file);

                return (
                    <img
                        className={cnFilesTableItem}
                        src={url}
                        alt={file.name}
                        key={file.name}
                    />
                )
            })}
        </div>
    )
}