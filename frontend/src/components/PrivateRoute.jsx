import React from 'react';
import { Navigate } from 'react-router-dom';
import getRoute from '../utils/routes';

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token');

  return token ? <Component /> : <Navigate to={getRoute('PAGE_LOGIN')} />;
};

export default PrivateRoute;
