import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css"; // Reusing styles from login page

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
      const response = await axios.post("http://localhost:8081/api/auth/forgot-password", { email });

      if (response.data.success) {
        setMessage("Password reset link sent! Check your email.");
      } else {
        setError("Email not found. Please enter a registered email.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
          Remembered your password? <a href="/">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
