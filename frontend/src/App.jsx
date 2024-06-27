import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Login from './Page/Login.jsx';
import NotFoundPage from './Page/NotFoundPage.jsx';

const App = () => (
  <div className="h-100 bg-light">
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
