import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnTable, cnTableDiagonal } from './Table.classnames';
import type { TableProps } from './Table.typings';

import './Table.scss';

export function Table(props: TableProps) {
    const { names, table: values, className } = props;

    const table: string[][] = [];

    table.push(['', ...names]);
    for (let i = 0; i < names.length; i++) {
        table.push([names[i], ...(values[i].map(v => (Math.round(v * 100) / 100).toString()))]);
    }

    return (
        <table className={classnames(cnTable, className)}>
            {table.map((row, i) => {
                return (
                    <tr key={i}>
                        {row.map((elem, j) => {
                            return (
                                <th key={j} className={(i === j && i !== 0) ? cnTableDiagonal : ''}>{elem}</th>
                            );
                        })}
                    </tr>
                );
            })}
        </table>
    );
}