import React, { useState } from "react";
import { registerUser } from "../services/Api";
import "../styles/LoginPage.css";


const SignupPage = () => { 
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",  
    password: "", 
    confirmPassword: "", 
  }); 
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.id]: e.target.value }); 
  }; 
 
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError("");
    
    if (!validatePhone(formData.phone)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) { 
      setError("Passwords do not match!");
      return; 
    } 
 
    try { 
      setLoading(true);
      const response = await registerUser({ 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        password: formData.password, 
      }); 
 
      alert(response.message); 
      setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" }); 
    } catch (error) { 
      setError(error.message || "Error signing up!");
    } finally {
      setLoading(false);
    }
  }; 
 
  return ( 
    <div className="login-container"> 
      {/* <Navbar />  */}
 
      <div className="login-card"> 
        <h2>Sign Up</h2> 
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}> 
          <div className="form-group"> 
            <label htmlFor="name">Full Name</label> 
            <input type="text" id="name" className="login-input-field" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required /> 
          </div> 
          <div className="form-group"> 
            <label htmlFor="email">Email</label> 
            <input type="email" id="email" className="login-input-field" placeholder="Enter your email" value={formData.email} onChange={handleChange} required /> 
          </div> 
          <div className="form-group"> 
            <label htmlFor="phone">Mobile Number</label> 
            <input type="text" id="phone" className="login-input-field" placeholder="Enter your mobile number" value={formData.phone} onChange={handleChange} required /> 
          </div> 
          <div className="form-group"> 
            <label htmlFor="password">Password</label> 
            <input type="password" id="password" className="login-input-field" placeholder="Enter your password" value={formData.password} onChange={handleChange} required /> 
          </div> 
          <div className="form-group"> 
            <label htmlFor="confirmPassword">Confirm Password</label> 
            <input type="password" id="confirmPassword" className="login-input-field" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required /> 
          </div> 
          <button type="submit" className="login-btn" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button> 
        </form> 
        <p className="signup-text"> 
          Already have an account? <a href="/">Log In</a> 
        </p> 
      </div> 
    </div> 
  ); 
}; 
 
export default SignupPage;
