import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/AdminSidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token"); // Remove authentication token
      navigate("/", { replace: true }); // Redirect to login
    }
  };

  return (
    <div className="sidebar">
      <h2>Deckline Admin</h2> 
      <ul className="ullist">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/quotations">Quotations</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/customers">Customers</Link></li>
        <li><Link to="/admin/contact">Contact us</Link></li>
       </ul>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
