import React from 'react';
import type { FilesListProps } from './FilesList.typings';
import { FilesListItem } from '../FilesListItem';

export function FilesList(props: FilesListProps) {
    const { files } = props;

    return (
        <div>
            {files.map(file => <FilesListItem file={file} />)}
        </div>
    )
}