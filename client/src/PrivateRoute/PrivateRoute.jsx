import React, { useContext } from 'react'
import { AuthContext } from '../authentication/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (user) {
        // If user is logged in, return the children
        return children;
    } else {
        // If user is not logged in, redirect to sign-in page
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
}

export default PrivateRoute
