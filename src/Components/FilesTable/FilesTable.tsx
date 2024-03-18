import React from 'react';
import { classnames } from '@bem-react/classnames';
import type { ImageFile } from '../../App';
import { FilesTableItem } from '../FilesTableItem';
import { cnFilesTable, cnFilesTableItem } from './FilesTable.classnames';
import type { FilesTableProps } from './FilesTable.typings';

import './FilesTable.scss';

export function FilesTable(props: FilesTableProps) {
    const {className, images, removeImage, isDisabled } = props;

    return (
        <div className={classnames(cnFilesTable, className)}>
            {images.map((image: ImageFile) =>
                <FilesTableItem
                    className={cnFilesTableItem}
                    image={image}
                    removeImage={() => removeImage(image.localId)}
                    key={image.localId}
                    isDisabled={isDisabled}
                />)
            }
        </div>
    )
}