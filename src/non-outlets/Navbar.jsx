import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Search,
} from "lucide-react";
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  // LocalStorage se role nikal rahe hain
  const userRole = localStorage.getItem("role");

  return (
    <nav className="navbar">
      <div className="logo">MyBrand</div>
      <ul className="nav-links">
        {/* Sabke liye common link */}
        <li>
          <Link to="/home">Home</Link>
        </li>

        {/* --- ROLE BASED LINKS START --- */}
        {isLoggedIn && (
          <>
            {/* 1. TENANT / USER LINKS */}
            {userRole === "ROLE_USER" && (
              <li>
                <Link to="/search">
                  <Search size={18} /> Search Rooms
                </Link>
              </li>
            )}

            {/* 2. ROOM OWNER LINKS */}
            {userRole === "ROLE_OWNER" && (
              <>
                <li>
                  <Link to="/add-room">
                    <PlusCircle size={18} /> Add Room
                  </Link>
                </li>
                <li>
                  <Link to="/my-listings">
                    <LayoutDashboard size={18} /> My Rooms
                  </Link>
                </li>
              </>
            )}

            {/* 3. SUPER ADMIN LINKS */}
            {userRole === "ROLE_ADMIN" && (
              <>
                <li>
                  <Link to="/admin/manage-users">
                    <Settings size={18} /> Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/admin/all-rooms">All Rooms</Link>
                </li>
              </>
            )}
          </>
        )}
        {/* --- ROLE BASED LINKS END --- */}

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="login-link"
              style={{ border: "none", cursor: "pointer", background: "none" }}
            >
              <LogOut size={20} />
              <span>Logout ({userRole?.replace("ROLE_", "")})</span>
            </button>
          ) : (
            <Link to="/login" className="login-link">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
