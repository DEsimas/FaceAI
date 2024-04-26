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
    const { selectedCounter, images, table, maximumFaces } = props;

    return (
        <Draggable
            handle={`.${cnWidgetHeader}`}
            disabled={DISABLE_WIDGET}
        >
            <div
                className={tableWidgetCn({ isShown: selectedCounter >= 2 })}
                style={{
                    maxWidth: `${selectedCounter * 150}px`
                }}
            >
                <Widget
                    selectedCounter={selectedCounter}
                    maximumFaces={maximumFaces}
                >
                    <Table
                        maximumFaces={maximumFaces}
                        images={images.filter(image => image.selectedIndexes.length !== 0)}
                        table={table}
                    />
                </Widget>
            </div>
        </Draggable>
    );
}
