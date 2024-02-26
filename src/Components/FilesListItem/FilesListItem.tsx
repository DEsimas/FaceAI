import React from 'react';
import type { FilesListItemProps } from './FilesListItem.typings';

export function FilesListItem(props: FilesListItemProps) {
    const { file } = props;

    return (
        <canvas key={file.name} style={{ backgroundImage: URL.createObjectURL(file) }}></canvas>
    )
}