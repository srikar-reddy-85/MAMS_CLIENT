// import axios from "axios";

// const API_URL = "http://localhost:8080/api/v1/auth";

// export const loginUser = async (credentials) => {
//     const response = await axios.post(`${API_URL}/authenticate`, credentials);
//     return response.data.token;
// };


// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth"; // update this if needed

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/authenticate`, credentials);
    // Save token to localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login page
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
