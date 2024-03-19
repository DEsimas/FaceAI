import React from 'react';
import { Header } from '../../Components/Header';
import { Table } from '../../Components/Table';
import { cnTableSection, cnTableSectionTable } from './TableSection.classnames';
import type { TableSectionProps } from './TableSection.typings';

import './TableSection.scss';

export function TableSection(props: TableSectionProps) {
    const { table } = props;

    return (
        <div className={cnTableSection}>
            <Header
                text='Таблица соответствия'
            />
            <Table
                table={table}
                className={cnTableSectionTable}
            />
        </div>
    );
}