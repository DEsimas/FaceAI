import React from 'react';
import Draggable from 'react-draggable';
import { DISABLE_WIDGET } from '../../Constants';
import { Widget } from '../Widget';
import { Table } from '../Table';
import { cnWidgetHeader } from '../Widget/Widget.classnames';
import { tableWidgetCn } from './TableWidget.classnames';
import type { TableWIdgetProps } from './TableWidget.typings';

import './TableWidget.scss';

export function TableWidget(props: TableWIdgetProps) {
    const {selectedCounter, images, table} = props;

    return (
        <Draggable
            handle={`.${cnWidgetHeader}`}
            disabled={DISABLE_WIDGET}
        >
            <div
                className={tableWidgetCn({isShown: selectedCounter >= 2})}
                style={{
                    width: window.innerWidth <= 420 ?
                        'calc(100% - 20px)' :
                        `${Math.max(50*(selectedCounter/10), 25)}%`
                }}
            >
                <Widget selectedCounter={selectedCounter}>
                    <Table images={images.filter(image => image.selectedIndexes.length !== 0)} table={table} />
                </Widget>
            </div>
        </Draggable>
    );
}
