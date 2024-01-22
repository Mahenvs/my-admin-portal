import React from 'react';
import { Route,  Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., check token validity)
  // Return true if authenticated, false otherwise
  if(localStorage.getItem('validUser') == true){
    return true;
  }
  return false; /* your authentication logic */;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
