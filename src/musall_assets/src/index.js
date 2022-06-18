import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { musall } from '../../declarations/musall';
import ErrorBoundary from './components/error_boundary';
import { HashRouter } from 'react-router-dom';
import { EmojiProvider } from 'react-apple-emojis';
import emojiData from './styles/emojis.json';
import './styles/index.scss';

const container = document.getElementById('app');
const app = createRoot(container);

// console.log("musall: ", musall);
// const getData = async () => {
//   let data = await musall.submit_contract();
//   console.log(data);
//   return data
// }

// useEffect(async () => {
//   await getData();
// }, []);

app.render(
  <HashRouter>
    <EmojiProvider data={emojiData}>
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    </EmojiProvider>
  </HashRouter>
);
