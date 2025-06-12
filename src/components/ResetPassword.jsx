import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("Token:", token);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://deckbackend-production.up.railway.app/api/auth/reset-password", {
        token,
        newPassword: password,
      });
  
      console.log("✅ Reset response:", response.data);
  
      if (response.status === 200) {
        setMessage("Password reset successful. You can now log in.");
      }
       else {
        setError(response.data.error || "Invalid or expired token.");
      }
    } catch (err) {
      console.error("❌ Reset Password Error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div>
      <h2>Reset Password</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {/* <a href="/"><button>Login</button></a> */}
      </form>
    </div>
  );
};

export default ResetPassword;
