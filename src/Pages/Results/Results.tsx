import React, { useEffect, useState } from 'react';
import { Button } from '../../Components/Button';
import { cnResults, cnResultsBack, cnResultsImages, cnResultsTable } from './Results.classnames';
import { Header } from '../../Components/Header';
import { Table } from '../../Components/Table';
import type { ResultProps } from './Results.typings';

import './Results.scss';

export function Result(props: ResultProps) {
    const { files, image_ids, table, goBack } = props;

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
                            const file = files[id];
                            return <div key={file.name}>
                                <div>{file.name}</div>
                                <img alt={file.name} src={urls[id]} />
                            </div>
                        }
                    )
                }
            </div>
        </div>
    );
}