import React from 'react';
import { classnames } from '@bem-react/classnames';
import { cnTable, cnTableDiagonal } from './Table.classnames';
import type { TableProps } from './Table.typings';

import './Table.scss';

export function Table(props: TableProps) {
    const { table: data, className } = props;

    const names = data.names;
    const values = data.values;

    const table: string[][] = [];

    table.push(['', ...names]);
    for (let i = 0; i < values.length; i++) {
        table.push([names[i], ...(values[i].map(v => (Math.round(v * 100) / 100).toString() + '%'))]);
    }

    return (
        <table className={classnames(cnTable, className)}>
            <thead>
                <tr>
                    {
                        table[0].map((row, i) => {
                            return (
                                <th key={i}>{row}</th>
                            );
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {table.map((row, i) => {
                    if (i === 0)
                        return null;
                    return (
                        <tr key={i}>
                            {row.map((elem, j) => {
                                return (
                                    <th key={j} className={(i === j) ? cnTableDiagonal : ''}>{elem}</th>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}