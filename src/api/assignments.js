// // src/api/assignments.js
// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/v1/assignments";

// const getAuthHeader = () => ({
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

// export const fetchAssignments = () => axios.get(BASE_URL, getAuthHeader());

// export const createAssignment = (assignmentData) =>
//     axios.post(BASE_URL, assignmentData, getAuthHeader());

// export const deleteAssignment = (id) =>
//     axios.delete(`${BASE_URL}/${id}`, getAuthHeader());


import axios from "axios";
import getAuthHeaders from "../utils/AuthUtil";

const BASE_URL = "http://localhost:8080/api/v1/assignments";


export const getAllAssignments = async () => {
    const response = await axios.get(BASE_URL, getAuthHeaders());
    return response.data;
};

export const createAssignment = async (assignmentData) => {
    const response = await axios.post(BASE_URL, assignmentData, getAuthHeaders());
    return response.data;
};

export const deleteAssignment = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
};
