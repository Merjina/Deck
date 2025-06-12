import axios from "axios";

const BASE_URL = "https://deckbackend-production.up.railway.app/api/"; // ✅ Updated for deployment

// REGISTER USER
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}//auth/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Error signing up!";
  }
};

// LOGIN USER
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, loginData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data; // returns { token, role }
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Error logging in!";
  }
};

// SEND FORGOT PASSWORD EMAIL
export const sendPasswordResetEmail = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Error sending reset link.";
  }
};

// RESET PASSWORD
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Error resetting password.";
  }
};
