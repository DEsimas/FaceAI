import React, { useEffect, useState } from 'react';
import { cnFilesTableItemImage, cnFilesTableItem, cnFilesTableItemCross } from './FilesTableItem.classnames';
import { classnames } from '@bem-react/classnames';
import { Button } from '../Button';
import { filesTableCn } from '../FilesTable/FilesTable.classnames';
import type { FilesTableItemProps } from './FilesTableItem.typings';

import './FilesTableItem.scss';

export function FilesTableItem(props: FilesTableItemProps) {
    const { file, className, removeFile, isDisabled } = props;

    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(URL.createObjectURL(file));
    }, [file]);

    return (
        <div className={classnames(cnFilesTableItem, className, filesTableCn({ isDisabled }))}>
            <Button
                className={cnFilesTableItemCross}
                onClick={() => removeFile(file.name)}
                type='close'
                z_index={isDisabled ? 0 : 2}
            />
            <img
                className={cnFilesTableItemImage}
                src={url}
                alt={file.name}
            />
        </div>
    );
}