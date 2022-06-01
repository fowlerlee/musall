import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { musall } from "../../declarations/musall";
import ErrorBoundary from './components/error_boundary';

const container = document.getElementById('app');
const app = createRoot(container);
console.log("musall object: ", musall);

app.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App data={musall} owner={musall.ownerOfDip721} dipName={musall.nameDip721}/>
    </ErrorBoundary>
  </React.StrictMode>
);