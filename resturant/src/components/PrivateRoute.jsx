// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element: Component, isAuthenticated }) => {
  return isAuthenticated ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;