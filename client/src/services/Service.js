import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

// Signup API Call
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};

// Login API Call
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
export async function getAlluser() {
  try {
    const response = await axios.get(`${API_URL}/getAllUsers`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "No User Found";
  }
}
