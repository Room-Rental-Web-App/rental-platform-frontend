import React from "react";
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
import ThemeToggle from "../../components/ThemeToggle"
import "../../CSS/AdminSidebar.css";

const AdminSidebar = () => {

  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) return;
    localStorage.clear();
    window.location.href = "/home";
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-header">
        <Shield size={24} color="#4f46e5" />
        <h3>Admin Panel</h3>
      </div>

      <nav>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Gauge size={20} /> My Dashboard
        </NavLink>

        <NavLink
          to="/admin/all-users"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Users size={20} /> All Users
        </NavLink>

        <NavLink
          to="/admin/all-rooms"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Building2 size={20} /> All Rooms
        </NavLink>

        <NavLink
          to="/admin/all-owners"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <UserCog size={20} /> All Owners
        </NavLink>

        <NavLink
          to="/admin/pending-approvals"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <UserPlus size={20} /> Pending Owners
        </NavLink>

        <NavLink
          to="/admin/pending-rooms"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <ClipboardCheck size={20} /> Pending Rooms
        </NavLink>
        <NavLink
          to="/admin/high-interest"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <AlertCircle size={20} color="#ef4444" />{" "}
          
          High Interest Rooms
        </NavLink>

        <NavLink
          to="/admin/pending-users"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <UserX size={20} /> Pending Users
        </NavLink>
        <NavLink
          to="/admin/support"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <Shield size={20} /> Support Requests
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <BarChart3 size={20} /> Reports
        </NavLink>
        <ThemeToggle />
        <NavLink onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
