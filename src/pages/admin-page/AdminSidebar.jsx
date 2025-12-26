import React from "react";
import { NavLink } from "react-router-dom";
import { Users, Home, UserCheck, Shield, LayoutDashboard } from "lucide-react";
import "../../CSS/AdminSidebar.css";
const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-header">
        <Shield size={24} color="#4f46e5" />
        <h3>Admin Panel</h3>
      </div>
      <nav>
        <NavLink
          to="/admin/all-users"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <LayoutDashboard size={20} /> All Users
        </NavLink>
        <NavLink
          to="/admin/all-rooms"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Home size={20} /> All Rooms
        </NavLink>
        <NavLink
          to="/admin/all-owners"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <UserCheck size={20} /> All Owners
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
