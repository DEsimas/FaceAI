import React from 'react';
import { classnames } from '@bem-react/classnames';
import { Header } from '../../Components/Header';
import { Table } from '../../Components/Table';
import { cnTableSection, cnTableSectionTable } from './TableSection.classnames';
import type { TableSectionProps } from './TableSection.typings';

import './TableSection.scss';

export function TableSection(props: TableSectionProps) {
    const { className, table } = props;

    return (
        <div className={classnames(cnTableSection, className)}>
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
