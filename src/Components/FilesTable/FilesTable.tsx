import React, { ChangeEvent, useCallback, useRef } from 'react';
import { classnames } from '@bem-react/classnames';
import { v4 } from 'uuid';
import type { ImageFile } from '../../App';
import { FilesTableItem } from '../FilesTableItem';
import { cnFilesTable, cnFilesTableInput, cnFilesTableItem, cnFilesTablePlaceholder } from './FilesTable.classnames';
import type { FilesTableProps } from './FilesTable.typings';

import './FilesTable.scss';

import ImageUploadPlaceholder from './../../Assets/imageUploadPlaceholder.jpg';
import ImagePlaceholder from './../../Assets/imagePlaceholder.jpg';

export function FilesTable(props: FilesTableProps) {
    const {className, images, removeImage, dragAmount, addFiles } = props;

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
                />)
            }
            {
                dragAmount ? Array.from(Array(dragAmount).keys()).map(() =>
                    <div
                        key={v4()}
                        className={cnFilesTableItem}>
                        <img
                            className={cnFilesTablePlaceholder}
                            src={ImagePlaceholder}
                            alt='Изображение'
                        />
                    </div>
                ) : null
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
