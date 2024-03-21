import React from 'react';
import { FilesListItem } from '../FilesListItem';
import type { FilesListProps } from './FilesList.typings';

export function FilesList(props: FilesListProps) {
    const { images, selectFace, className, disabled, removeImage } = props;

    return (
        <div className={className}>
            {
                images.map(
                    image => <FilesListItem
                        removeImage={() => removeImage(image.localId)}
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
