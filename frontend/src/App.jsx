import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Login from './Pages/Login.jsx';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Navigate to="/login" />
    </Routes>
  </>
);

export default App;
