import React from 'react';
import Draggable from 'react-draggable';
import { Widget } from '../Widget';
import { Table } from '../Table/Table';
import { cnWidgetHeader } from '../Widget/Widget.classnames';
import { tableWidgetCn } from './TableWidget.classnames';
import type { TableWIdgetProps } from './TableWidget.typings';

import './TableWidget.scss';

export function TableWidget(props: TableWIdgetProps) {
    const {selectedCounter, images, table} = props;

    return (
        <Draggable
            handle={`.${cnWidgetHeader}`}
        >
            <div className={tableWidgetCn({isShown: selectedCounter >= 2})}>
                <Widget selectedCounter={selectedCounter}>
                    <Table images={images.filter(image => image.selectedIndexes.length !== 0)} table={table} />
                </Widget>
            </div>
        </Draggable>
    );
}
