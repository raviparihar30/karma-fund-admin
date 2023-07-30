// api.js
import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Set a timeout for requests (optional)
});

export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data; // Assuming the server returns the token in the response
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (endpoint, values) => {
  try {
    const response = await api.post(endpoint, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Assuming the server returns the token in the response
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (endpoint, values) => {
  try {
    const response = await api.put(endpoint, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Assuming the server returns the token in the response
  } catch (error) {
    throw error;
  }
};
