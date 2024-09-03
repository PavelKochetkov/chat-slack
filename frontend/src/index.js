import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import init from './init.js';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const socket = io();
  const app = await init(socket);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        {app}
      </BrowserRouter>
    </React.StrictMode>,
  );
};

run();
