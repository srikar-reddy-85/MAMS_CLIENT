import axios from "axios";
import getAuthHeaders from "../utils/AuthUtil";


const LOCATIONS_URL = "http://localhost:8080/api/v1/locations";




export const getAllLocations = async () => {
    const response = await axios.get(LOCATIONS_URL, getAuthHeaders());
    return response.data;
};

export const createLocation = async (locationData) => {
    const response = await axios.post(LOCATIONS_URL, locationData, getAuthHeaders());
    return response.data;
};

export const deleteLocation = async (id) => {
    const response = await axios.delete(`${LOCATIONS_URL}/${id}`, getAuthHeaders());
    return response.data;
};
