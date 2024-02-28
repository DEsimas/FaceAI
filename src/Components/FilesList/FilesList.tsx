import React, { useEffect } from 'react';
import type { FilesListProps } from './FilesList.typings';
import { FilesListItem } from '../FilesListItem';

export function FilesList(props: FilesListProps) {
    const { files, coordinates, className, selections } = props;

    return (
        <div className={className}>
            {
                files.map(
                    (file, index) => <FilesListItem
                        key={index}
                        file={file}
                        imageCoordinates={coordinates[index]}
                        selection={selections[index]}
                    />
                )
            }
        </div>
    )
}