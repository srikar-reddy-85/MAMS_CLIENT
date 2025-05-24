import axios from "axios";
import getAuthHeaders from "../utils/AuthUtil";
const BASE_URL = "http://localhost:8080/api/v1/assets";

export const getAllAssets = async () => {
    const response = await axios.get(BASE_URL, getAuthHeaders());
    return response.data;
};

export const createAsset = async (assetData) => {
    const response = await axios.post(BASE_URL, assetData, getAuthHeaders());
    return response.data;
};

export const deleteAsset = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    return response.data;
};