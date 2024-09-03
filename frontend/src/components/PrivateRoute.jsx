import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { generatePageRoute } from '../utils/routes';
import { selectIsAuth } from '../store/slice/authSlice';

const PrivateRoute = ({ element: Component }) => {
  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Component /> : <Navigate to={generatePageRoute('PAGE_LOGIN')} />;
};

export default PrivateRoute;
