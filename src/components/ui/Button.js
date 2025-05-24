import React from "react";

const Button = ({ children, onClick, type = "button", className = "", ...props }) => (
    <button
        onClick={onClick}
        type={type}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;