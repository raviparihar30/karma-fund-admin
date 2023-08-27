// api.js
import axios from "axios";

export const BASE_URL =
  "http://ec2-3-109-151-193.ap-south-1.compute.amazonaws.com:8000/"; // Replace with your API base URL
export const IMAGE_URL =
  "http://ec2-3-109-151-193.ap-south-1.compute.amazonaws.com:8000/uploads/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Set a timeout for requests (optional)
});

export const getRequest = async (endpoint) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(endpoint, {
      headers: {
        Authorization: token,
      },
    });
    return response.data; // Assuming the server returns the token in the response
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (endpoint, values, options = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(endpoint, values, {
      ...options,
      headers: {
        Authorization: token,
        ...options.headers,
      },
    });
    return response.data; // Assuming the server returns the token in the response
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (endpoint, values, options = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.put(endpoint, values, {
      ...options,
      headers: {
        Authorization: token,
        ...options.headers,
      },
    });
    return response.data; // Assuming the server returns the token in the response
  } catch (error) {
    throw error;
  }
};
