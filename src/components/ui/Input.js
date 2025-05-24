import React from "react";

const Input = ({ label, type = "text", value, onChange, ...props }) => (
    <div className="mb-4">
        {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
        <input
            type={type}
            value={value}
            onChange={onChange}
            {...props}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export default Input;