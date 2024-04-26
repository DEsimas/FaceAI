import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { DISABLE_WIDGET } from '../../Constants';
import { Widget } from '../Widget';
import { Table } from '../Table';
import { cnWidgetHeader } from '../Widget/Widget.classnames';
import { tableWidgetCn } from './TableWidget.classnames';
import type { TableWIdgetProps } from './TableWidget.typings';

import './TableWidget.scss';

export function TableWidget(props: TableWIdgetProps) {
    const { selectedCounter, images, table, maximumFaces } = props;

    const widget = useRef<HTMLDivElement>();

    return (
        <Draggable
            handle={`.${cnWidgetHeader}`}
            disabled={DISABLE_WIDGET}
        >
            <Resizable
                height={300}
                width={300}
            >
                <div
                    className={tableWidgetCn({ isShown: selectedCounter >= 2 })}
                    style={{
                        maxWidth: `${selectedCounter * 150}px`
                    }}
                    ref={widget}
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
            </Resizable>
        </Draggable>
    );
}
