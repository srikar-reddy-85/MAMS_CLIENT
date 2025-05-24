import axios from "axios";
import getAuthHeaders from "../utils/AuthUtil";

const PURCHASES_URL = "http://localhost:8080/api/v1/purchases";

export const getAllPurchases = async () => {
    const response = await axios.get(PURCHASES_URL, getAuthHeaders());
    // console.log(response.data);
    return response.data;
};

export const createPurchase = async (purchaseData) => {
    const response = await axios.post(PURCHASES_URL, purchaseData, getAuthHeaders());
    return response.data;
};

export const deletePurchase = async (id) => {
    const response = await axios.delete(`${PURCHASES_URL}/${id}`, getAuthHeaders());
    return response.data;
};