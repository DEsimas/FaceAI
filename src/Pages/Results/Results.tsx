import React from 'react';
import type { ResultProps } from './Results.typings';
import { Button } from '../../Components/Button';

export function Result(props: ResultProps) {
    const { files, image_ids, table, goBack } = props;

    return (
        <div>
            <Button
                text='Назад'
                onClick={goBack}
            />
            {/* Slider */}
            {/* Table */}
        </div>
    );
}