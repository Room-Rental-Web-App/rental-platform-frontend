import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Shield,
  Gauge,
  Users,
  Building2,
  UserCog,
  UserPlus,
  ClipboardCheck,
  UserX,
  LogOut,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/ThemeToggle";
import "../css/AdminSidebar.css";

const AdminSidebar = () => {
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.clear();
    window.location.href = "/home";
  };

  return (
    <div className="admin-sidebar">

      <div className="admin-header">
        <NavLink to="/home">
            <img src={logo} alt="Logo"  className={`navbar-logo ${theme === "dark" ? "dark-logo" : "light-logo"}`}/>
          </NavLink>
      </div>

      <nav>
        <NavLink to="/admin/dashboard">
          <Gauge size={20} /> Dashboard
        </NavLink>

        <NavLink to="/admin/all-users">
          <Users size={20} /> All Users
        </NavLink>

        <NavLink to="/admin/all-owners">
          <UserCog size={20} /> All Owners
        </NavLink>

        <NavLink to="/admin/pending-users">
          <UserX size={20} /> Pending Users
        </NavLink>

        <NavLink to="/admin/pending-owners">
          <UserPlus size={20} /> Pending Owners
        </NavLink>

        <NavLink to="/admin/search">
          <Building2 size={20} /> All Rooms
        </NavLink>

        <NavLink to="/admin/pending-rooms">
          <ClipboardCheck size={20} /> Pending Rooms
        </NavLink>

        <NavLink to="/admin/high-interest">
          <AlertCircle size={20} color="#ef4444" /> High Interest Rooms
        </NavLink>

        <NavLink to="/admin/reports">
          <BarChart3 size={20} /> Reports
        </NavLink>

        <NavLink to="/admin/support">
          <Shield size={20} /> Support Requests
        </NavLink>

       <ThemeToggle setTheme={setTheme} theme={theme} />

        {/* Logout should NOT be NavLink */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
