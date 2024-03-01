import React, { useEffect, useState } from 'react';
import { Button } from '../../Components/Button';
import { cnResults, cnResultsBack, cnResultsImage, cnResultsImages, cnResultsTable } from './Results.classnames';
import { Header } from '../../Components/Header';
import { Table } from '../../Components/Table';
import type { ResultProps } from './Results.typings';

import './Results.scss';
import { FilesListItem } from '../../Components/FilesListItem';

export function Result(props: ResultProps) {
    const { files, image_ids, table, goBack, coordinates } = props;

    const [urls, setUrls] = useState<Record<string, string>>({});

    useEffect(() => {
        const n: Record<string, string> = {}
        image_ids.forEach(id => n[id] = URL.createObjectURL(files[id]))
        setUrls(n);
    }, [setUrls, files]);

    return (
        <div className={cnResults}>
            <Button
                text='Назад'
                onClick={goBack}
                className={cnResultsBack}
            />
            <Header
                text='Таблица соответствия'
            />
            <Table
                names={image_ids.map((id) => files[id].name)}
                table={table}
                className={cnResultsTable}
            />
            <div className={cnResultsImages}>
                {
                    image_ids.map(
                        (id) => {
                            return (
                                <div
                                    className={cnResultsImage}
                                    key={id}
                                >
                                    <div>{files[id].name}</div>
                                    <FilesListItem
                                        file={files[id]}
                                        imageCoordinates={coordinates[id]}
                                        disabled={true}
                                    />
                                </div>
                            );
                        }
                    )
                }
            </div>
        </div>
    );
}