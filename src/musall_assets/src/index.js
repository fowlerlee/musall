import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { musall } from "../../declarations/musall";
import ErrorBoundary from './components/error_boundary';

const container = document.getElementById('app');
const app = createRoot(container);

// console.log("musall: ", musall);
// const getData = async () => {
//   let data = await musall.totalSupplyDip721();
//   console.log(data);
//   return data
// }

// useEffect(async () => {
//   await getData();
// }, []);

app.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);