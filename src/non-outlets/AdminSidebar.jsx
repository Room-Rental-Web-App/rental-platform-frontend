import React, { useState, useEffect } from "react";
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
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Sync theme with document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    // Remove only auth-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/home";
  };

  // Scalable navigation structure
  const navItems = [
    { to: "/admin/dashboard", icon: Gauge, label: "Dashboard" },
    { to: "/admin/revenue-report", icon: Users, label: "Revenue Report" },
    { to: "/admin/all-users", icon: Users, label: "All Users" },
    { to: "/admin/all-owners", icon: UserCog, label: "All Owners" },
    { to: "/admin/pending-users", icon: UserX, label: "Pending Users" },
    { to: "/admin/pending-owners", icon: UserPlus, label: "Pending Owners" },
    { to: "/admin/search", icon: Building2, label: "All Rooms" },
    { to: "/admin/pending-rooms", icon: ClipboardCheck, label: "Pending Rooms" },
    { to: "/admin/high-interest", icon: AlertCircle, label: "High Interest Rooms", special: "error" },
    { to: "/admin/reports", icon: BarChart3, label: "Reports" },
    { to: "/admin/support", icon: Shield, label: "Support Requests" },
  ];

  return (
    <div className="admin-sidebar">
      {/* Header */}
      <div className="admin-header">
        <NavLink to="/home">
          <img
            src={logo}
            alt="Logo"
            className={`navbar-logo ${
              theme === "dark" ? "dark-logo" : "light-logo"
            }`}
          />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="side-nav">
        {navItems.map(({ to, icon: Icon, label, special }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <Icon
              size={20}
              className={special === "error" ? "icon-error" : ""}
            />
            {label}
          </NavLink>
        ))}

        {/* Theme Toggle */}
        <div className="theme-toggle-wrapper">
          <ThemeToggle setTheme={setTheme} theme={theme} />
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
  