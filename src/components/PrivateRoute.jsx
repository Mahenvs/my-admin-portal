import React from "react";
import { Route,Routes, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., check token validity)
  // Return true if authenticated, false otherwise
  console.log("7777",localStorage.getItem("token") != null);
  return localStorage.getItem("token") != null;
};
const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated() ? (
            <Element />
          ) : (
            <Navigate to="/register" replace />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
