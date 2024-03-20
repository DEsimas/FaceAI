import React from 'react';
import { FilesListItem } from '../FilesListItem';
import type { FilesListProps } from './FilesList.typings';

export function FilesList(props: FilesListProps) {
    const { images, selectFace, className, disabled } = props;

    return (
        <div className={className}>
            {
                images.map(
                    image => <FilesListItem
                        key={image.localId}
                        image={image}
                        selectFace={(index) => selectFace(image.localId, index)}
                        disabled={disabled}
                    />
                )
            }
        </div>
    );
}
