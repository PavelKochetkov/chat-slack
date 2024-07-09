/* eslint-disable react/self-closing-comp */
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar.jsx';
import Login from './Page/Login.jsx';
import ChatPage from './Page/ChatPage.jsx';
import NotFoundPage from './Page/NotFoundPage.jsx';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
