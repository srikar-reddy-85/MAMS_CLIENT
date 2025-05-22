// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//     const { authData } = useContext(AuthContext);

//     if (!authData) return <Navigate to="/login" />;
//     if (allowedRoles && !allowedRoles.includes(authData.role)) return <Navigate to="/unauthorized" />;

//     return children;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
