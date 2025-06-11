import axios from "axios"; 
 
const BASE_URL = "http://localhost:8081/api/auth"; // Your backend URL 
 
export const registerUser = async (userData) => { 
  try { 
    const response = await axios.post("http://localhost:8081/api/auth/signup", userData, { 
      headers: { "Content-Type": "application/json" }, 
    }); 
 
    console.log(response.data); 
    return response.data; 
  } catch (error) { 
    console.error(error); 
    throw error.response ? error.response.data.message : "Error signing up!"; 
  } 
};


export const sendPasswordResetEmail = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/fpass`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error sending reset link.");
  }
};
export const loginUser = async (loginData) => { 
    try { 
      const response = await axios.post(`${BASE_URL}/login`, loginData, { 
        headers: { "Content-Type": "application/json" }, 
      }); 
   
      console.log(response.data); // You should log or inspect the response to ensure it's correct 
      return response.data; // Returns { message: "Login successful!" } 
    } catch (error) { 
      console.error(error); 
   
      // If error, return a user-friendly message 
      throw error.response ? error.response.data.message : "Error logging in!"; 
    } 
  };