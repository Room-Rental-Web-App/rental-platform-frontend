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
import "../CSS/AdminSidebar.css";

const AdminSidebar = ({onLogout}) => {
  const [open, setOpen] = useState(false);



const navItems = [
  { to: "/admin/dashboard", icon: Gauge, label: "Overview" },
  { to: "/admin/revenue-report", icon: BarChart3, label: "Revenue Analytics" },
  { to: "/admin/all-users", icon: Users, label: "User Management" },
  { to: "/admin/all-owners", icon: UserCog, label: "Owner Management" },
  { to: "/admin/pending-users", icon: UserX, label: "User Approvals" },
  { to: "/admin/pending-owners", icon: UserPlus, label: "Owner Approvals" },
  { to: "/admin/search", icon: Building2, label: "Property Listings" },
  { to: "/admin/pending-rooms", icon: ClipboardCheck, label: "Listing Approvals" },
  { to: "/admin/high-interest", icon: AlertCircle, label: "Flagged Activity", special: true },
  { to: "/admin/reports", icon: Shield, label: "System Reports" },
  { to: "/admin/support", icon: Shield, label: "Support Center" },
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
            <button className="logout-btn" onClick={onLogout}>
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
