import React from "react";

export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
    <div className={`text-gray-800 ${className}`}>{children}</div>
);