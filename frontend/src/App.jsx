import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './local/Navbar.jsx';
import Login from './Page/Login.jsx';
import NotFoundPage from './Page/NotFoundPage.jsx';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
