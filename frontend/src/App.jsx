import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './сomponents/Navbar.jsx';
import Login from './pages/Login.jsx';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
);

export default App;
