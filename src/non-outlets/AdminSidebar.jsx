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
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/ThemeToggle";
import "../css/AdminSidebar.css";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/home";
  };

  const navItems = [
    { to: "/admin/dashboard", icon: Gauge, label: "Dashboard" },
    { to: "/admin/revenue-report", icon: BarChart3, label: "Revenue" },
    { to: "/admin/all-users", icon: Users, label: "Users" },
    { to: "/admin/all-owners", icon: UserCog, label: "Owners" },
    { to: "/admin/pending-users", icon: UserX, label: "Pending Users" },
    { to: "/admin/pending-owners", icon: UserPlus, label: "Pending Owners" },
    { to: "/admin/search", icon: Building2, label: "Rooms" },
    { to: "/admin/pending-rooms", icon: ClipboardCheck, label: "Pending Rooms" },
    { to: "/admin/high-interest", icon: AlertCircle, label: "High Interest", special: true },
    { to: "/admin/reports", icon: Shield, label: "Reports" },
    { to: "/admin/support", icon: Shield, label: "Support" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>


      {/* Overlay */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        {/* Close button (mobile) */}
    

        {/* Logo */}
        <div className="admin-header">
          <NavLink to="/admin/dashboard">
            <img src={logo} alt="Logo" className="navbar-logo" />
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
              onClick={() => setOpen(false)}
            >
              <Icon size={18} className={special ? "icon-error" : ""} />
              <span>{label}</span>
            </NavLink>
          ))}

          <div className="sidebar-bottom">
            <ThemeToggle />
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
