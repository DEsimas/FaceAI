import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <body>
            Testing test
        </body>
    </React.StrictMode>
);