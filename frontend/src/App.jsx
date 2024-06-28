import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Login from './Page/Login.jsx';
import NotFoundPage from './Page/NotFoundPage.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </div>
);

export default App;
