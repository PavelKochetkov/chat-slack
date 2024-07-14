import React, { useEffect } from 'react';
import {
  Route, Routes, useNavigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Navbar from './Components/Navbar.jsx';
import Login from './Page/Login.jsx';
import ChatPage from './Page/ChatPage.jsx';
import Signup from './Page/Signup.jsx';
import NotFoundPage from './Page/NotFoundPage.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

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
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <Navbar />
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer />
        </ErrorBoundary>
      </Provider>
    </div>
  );
};

export default App;
