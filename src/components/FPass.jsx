import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";
import { BASE_URL } from "../api"; // Make sure this is correctly pointing to your backend

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email });

      if (response.data.success) {
        setMessage("Password reset link sent! Check your email.");
      } else {
        setError("Email not found. Please enter a registered email.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Forgot Password</h2>
        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter your registered email</label>
            <input
              type="email"
              id="email"
              className="login-input-field"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <p className="signup-text">
          Remembered your password? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
