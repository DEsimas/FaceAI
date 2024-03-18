import React from 'react';
import { FilesListItem } from '../FilesListItem';
import type { FilesListProps } from './FilesList.typings';

export function FilesList(props: FilesListProps) {
    const { images, className } = props;

    return (
        <div className={className}>
            {
                images.map(
                    image => <FilesListItem
                        key={image.localId}
                        image={image}
                    />
                )
            }
        </div>
    )
}