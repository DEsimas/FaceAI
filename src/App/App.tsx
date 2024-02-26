import React, { useCallback, useState } from 'react';
import { CoordinatesResponse, LoadFiles } from '../Pages/LoadFiles';
import type { AppState, Coordinates } from './App.typings';

import './App.scss';
import { SelectFaces } from '../Pages/SelectFaces';

export function App() {
    const [state, setState] = useState<AppState>('Load');
    const [files, setFiles] = useState<File[]>([]);
    const [coordinates, setCoordinates] = useState<Coordinates>([]);

    const toLoad = useCallback(() => {
        setState('Load');
    }, [setState]);

    const toSelect = useCallback((coordinates: CoordinatesResponse) => {
        setState('Select');
        setFiles(coordinates.files);
        setCoordinates(coordinates.coordinates);
    }, [setState, setFiles, setCoordinates]);

    let Page;
    switch (state) {
        case 'Load':
            Page = <LoadFiles
                files={files}
                nextStage={toSelect}
            />;
            break;
        case 'Select':
            Page = <SelectFaces
                files={files}
                coordinates={coordinates}
                previousStage={toLoad}
            />;
            break;
        case 'Results':
            break;
    }

    return (
        Page
    );
}