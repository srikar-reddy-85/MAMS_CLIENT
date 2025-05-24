import axios from "axios";
import getAuthHeaders from "../utils/AuthUtil";

const PERSONNEL_URL = "http://localhost:8080/api/v1/personnel";

export const getAllPersonnel = async () => {
    const response = await axios.get(PERSONNEL_URL, getAuthHeaders());
    return response.data;
};

export const createPersonnel = async (personnelData) => {
    const response = await axios.post(PERSONNEL_URL, personnelData, getAuthHeaders());
    return response.data;
};

export const deletePersonnel = async (id) => {
    const response = await axios.delete(`${PERSONNEL_URL}/${id}`, getAuthHeaders());
    return response.data;
};
