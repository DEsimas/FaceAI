import React, { useCallback, useState } from 'react';
import { CoordinatesResponse, LoadFiles } from '../Pages/LoadFiles';
import { SelectFaces, ServerResponse } from '../Pages/SelectFaces';
import { Result } from '../Pages/Results/Results';
import { AppState, Coordinates, FilesDict } from './App.typings';

import './App.scss';

export function App() {
    const [state, setState] = useState<AppState>('Load');
    const [files, setFiles] = useState<File[]>([]);
    const [coordinates, setCoordinates] = useState<Coordinates>([]);
    const [image_ids, setImage_ids] = useState<string[]>([]);
    const [final_image_ids, setFinalImageIds] = useState<string[]>([]);
    const [filesDict, setFilesDict] = useState<FilesDict>({});
    const [table, setTable] = useState<number[][]>([]);

    const toLoad = useCallback(() => {
        setState('Load');
    }, [setState]);

    const toSelect = useCallback((coordinates: CoordinatesResponse) => {
        setState('Select');
        setFiles(coordinates.files);
        setCoordinates(coordinates.coordinates);
        setImage_ids(coordinates.image_ids);
        const dict: FilesDict = {};
        for (let i = 0; i < coordinates.image_ids.length; i++) {
            dict[coordinates.image_ids[i]] = coordinates.files[i];
        }
        setFilesDict(dict);
    }, [setState, setFiles, setCoordinates, setImage_ids]);

    const toResults = useCallback((result: ServerResponse) => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
        setState('Results');
        setTable(result.table);
        setFinalImageIds([...result.image_ids]);
    }, []);

    const backToSelect = useCallback(() => {
        setState('Select');
    }, [setState]);

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
                image_ids={image_ids}
                nextStage={toResults}
            />;
            break;
        case 'Results':
            Page = <Result
                files={filesDict}
                table={table}
                image_ids={final_image_ids}
                goBack={backToSelect}
            />;
            break;
    }

    return (
        Page
    );
}