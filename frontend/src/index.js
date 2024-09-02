import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import socket from './socket.js';
import init from './init.js';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const app = await init(socket);
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        {app}
      </React.StrictMode>
    </BrowserRouter>,
  );
};

run();
