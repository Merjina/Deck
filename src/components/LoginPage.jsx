import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(""); // Stores email or phone
  const [password, setPassword] = useState(""); // Stores password
  const [error, setError] = useState(""); // Stores error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
  
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        identifier,
        password,
      });
  
      const { token, role } = response.data; // Get token and role
  
      localStorage.setItem("token", token); // Store token for authentication
  
      if (role === "ADMIN") {
        navigate("/admindash"); // Redirect to Admin dashboard
      } else {
        navigate("/home"); // Redirect to User home page
      }
    } catch (error) {
      setError("Invalid email or password"); // Show error if login fails
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="identifier">Email or Mobile</label>
            <input
              type="text"
              id="identifier"
              className="login-input-field"
              placeholder="Enter your email or mobile"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="login-input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <p className="signup-text">
          Forgot Password? <a href="/fpass">Click Here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
