import React from "react";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="navbar">
      <input type="text" placeholder="Search..." className="search-box" />
      <div className="user-profile">
        <span>Admin</span>
        {/* <img src="https://via.placeholder.com/40" alt="Profile" /> */}
      </div>
    </div>
  );
};

export default AdminNavbar;
