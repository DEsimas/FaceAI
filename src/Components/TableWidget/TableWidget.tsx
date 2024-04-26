import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import useWidth from '../../Hooks/UseWidth';
import { Widget } from '../Widget';
import { Table } from '../Table';
import { cnWidgetHeader } from '../Widget/Widget.classnames';
import { tableWidgetCn } from './TableWidget.classnames';
import type { TableWIdgetProps } from './TableWidget.typings';

import './TableWidget.scss';

export function TableWidget(props: TableWIdgetProps) {
    const { selectedCounter, images, table, maximumFaces } = props;

    const widget = useRef<HTMLDivElement>();

    const width = useWidth();

    return (
        <Draggable
            handle={`.${cnWidgetHeader}`}
            // disabled={width < 600}
            disabled
        >
            <Resizable
                height={300}
                width={300}
            >
                <div
                    className={tableWidgetCn({ isShown: selectedCounter >= 2 })}
                    style={{
                        maxWidth: width > 600 ? `${selectedCounter * 150}px` : 'unset'
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
