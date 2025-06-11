import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";
import Navbar from "./AdminNavbar";
import "../styles/AdminDash.css";

const AdminDash = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Navbar stays fixed */}
        {/* <Navbar /> */}

        {/* Dynamic Content Area - This will change based on the selected sidebar option */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
