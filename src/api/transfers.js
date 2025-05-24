import axios from "axios";
import getAuthHeaders from "../utils/AuthUtil";

const TRANSFERS_URL = "http://localhost:8080/api/v1/transfers";

export const getAllTransfers = async () => {
    const response = await axios.get(TRANSFERS_URL, getAuthHeaders());
    return response.data;
};

export const createTransfer = async (transferData) => {
    const response = await axios.post(TRANSFERS_URL, transferData, getAuthHeaders());
    return response.data;
};

export const deleteTransfer = async (id) => {
    const response = await axios.delete(`${TRANSFERS_URL}/${id}`, getAuthHeaders());
    return response.data;
};
