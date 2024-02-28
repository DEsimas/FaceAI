import React from 'react';
import { Button } from '../../Components/Button';
import { cnResults, cnResultsBack, cnResultsTable } from './Results.classnames';
import { Header } from '../../Components/Header';
import type { ResultProps } from './Results.typings';

import './Results.scss';
import { Table } from '../../Components/Table';

export function Result(props: ResultProps) {
    const { files, image_ids, table, goBack } = props;

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
                names={image_ids.map((id, index) => Object.values(files)[index].name)} // replace index with id
                table={table}
                className={cnResultsTable}
            />
            {/* Slider */}
        </div>
    );
}