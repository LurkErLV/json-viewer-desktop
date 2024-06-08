import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './Main.jsx';

const domNode = document.getElementById("root");

const root = createRoot(domNode);
root.render(<Main/>);