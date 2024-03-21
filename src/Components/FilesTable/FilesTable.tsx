import React, { ChangeEvent, useCallback, useRef } from 'react';
import { classnames } from '@bem-react/classnames';
import type { ImageFile } from '../../App';
import { FilesTableItem } from '../FilesTableItem';
import { cnFilesTable, cnFilesTableInput, cnFilesTableItem, cnFilesTablePlaceholder } from './FilesTable.classnames';
import type { FilesTableProps } from './FilesTable.typings';

import './FilesTable.scss';

import ImageUploadPlaceholder from './../../Assets/imageUploadPlaceholder.jpg';

export function FilesTable(props: FilesTableProps) {
    const {className, images, removeImage, isDisabled, addFiles } = props;

    const inputFile = useRef<HTMLInputElement | null>(null);

    const onClickHandler = useCallback(() => {
        inputFile.current.click();
    }, [inputFile]);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(Array.from(e.target.files));
        }
    }, [addFiles]);

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
            <div
                onClick={onClickHandler}
                className={cnFilesTableItem}>
                <img
                    className={cnFilesTablePlaceholder}
                    src={ImageUploadPlaceholder}
                    alt='Загрузить изображения'
                />
            </div>
            <input
                className={cnFilesTableInput}
                ref={inputFile}
                accept='image/*'
                type='file'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
}
