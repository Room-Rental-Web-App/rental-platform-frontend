import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import {FolderLock, User, LogOut, Settings, ChevronDown } from "lucide-react";

import "../css/Navbar.css";
import logoImg from "../assets/logo.png";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();


  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderLink = (to, icon, text, extra = null) => (
    <li>
      <Link to={to}>
        {extra}
        {icon} <span>{text}</span>
      </Link>
    </li>
  );

  const roleLinks = {
    ROLE_USER: [
      renderLink(
        "/wishlist", null, "Wishlist",
        wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>
      ),
      renderLink("/premium", null, "Premium"),
    ],

    ROLE_OWNER: [
      renderLink("/add-room", null, "Add Room"),
      renderLink("/my-listings", null, "My Rooms"),
      renderLink("/premium", null, "Premium"),
      renderLink("/owner/users", null, "Owner Users"),
    ],

    ROLE_ADMIN: [
      renderLink("/admin/all-users", null, "Admin Dashboard"),
    ],
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/home">
          <img src={logoImg} alt="RoomsDekho Logo" className="navbar-logo" />
        </Link>
      </div>

      <ul className="nav-links">
        {renderLink("/home", null, "Home")}
        {renderLink("/about", null, "About")}

        {!isLoggedIn || userRole === "ROLE_USER"
          ? renderLink("/search", null, "Search Rooms")
          : null}

        {isLoggedIn && roleLinks[userRole]}

        {/* SETTINGS DROPDOWN */}
        {isLoggedIn && (
          <li className="settings-menu" ref={menuRef}>
            <button
              className="settings-btn"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <Settings size={20} />
              <ChevronDown size={16} />
            </button>

            {openMenu && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setOpenMenu(false)}>
                  <User size={16} />
                  Profile
                </Link>

                <div className="theme-toggle-wrapper">
                  <ThemeToggle />
                </div>

                <button
                  className="logout-btn"
                  onClick={() => {
                    onLogout();
                    setOpenMenu(false);
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>

                <button
                  className="reset-password-btn"
                  onClick={() => {n}}
                >
                  <FolderLock size={16} />
                  Reset Password
                </button>
              </div>
            )}
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <Link to="/login" className="login-link">
              <User size={20} />
              <span>Login</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
