import React from 'react';
import type { FilesListProps } from './FilesList.typings';
import { FilesListItem } from '../FilesListItem';

export function FilesList(props: FilesListProps) {
    const { files, coordinates, className } = props;

    return (
        <div className={className}>
            {
                files.map(
                    (file, index) => <FilesListItem
                        file={file}
                        imageCoordinates={coordinates[index]}
                    />
                )
            }
        </div>
    )
}