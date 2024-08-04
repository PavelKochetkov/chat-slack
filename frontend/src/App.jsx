import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Navbar from './components/Navbar.jsx';
import Login from './page/Login.jsx';
import ChatPage from './page/ChatPage.jsx';
import Signup from './page/Signup.jsx';
import NotFoundPage from './page/NotFoundPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute element={ChatPage} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </div>
);

export default App;
