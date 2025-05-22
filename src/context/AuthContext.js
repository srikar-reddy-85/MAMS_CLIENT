import React, { createContext, useState, useEffect } from "react";
import { decodeToken } from "../utils/jwtUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = decodeToken(token);
        return { token, role: decoded.role };
    });

    const login = (token) => {
        const decoded = decodeToken(token);
        localStorage.setItem("token", token);
        setAuthData({ token, role: decoded.role });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};