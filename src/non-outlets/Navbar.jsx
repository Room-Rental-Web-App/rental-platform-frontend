import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate add kiya password reset ke liye
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import { FolderLock, User, LogOut, Settings, ChevronDown } from "lucide-react";

import "../css/Navbar.css";
import logoImg from "../assets/logo.png";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

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

  // FIXED: RenderLink ab hamesha ek unique 'key' lega
  const renderLink = (to, icon, text, extra = null, key) => (
    <li key={key || to}>
      <Link to={to} onClick={() => setOpenMenu(false)}>
        {extra}
        {icon} <span>{text}</span>
      </Link>
    </li>
  );

  // FIXED: roleLinks ko object ki jagah function banaya taaki 'key' pass ho sake
  const getRoleLinks = () => {
    switch (userRole) {
      case "ROLE_USER":
        return [
          renderLink(
            "/wishlist",
            null,
            "Wishlist",
            wishlistCount > 0 && (
              <span className="wishlist-badge">{wishlistCount}</span>
            ),
            "wishlist",
          ),
          renderLink("/premium", null, "Premium", null, "premium"),
        ];
      case "ROLE_OWNER":
        return [
          renderLink("/add-room", null, "Add Room", null, "add"),
          renderLink("/my-listings", null, "My Rooms", null, "listings"),
          renderLink("/premium", null, "Premium", null, "premium-owner"),
          renderLink("/owner/users", null, "Owner Users", null, "owner-users"),
        ];
      case "ROLE_ADMIN":
        return [
          renderLink(
            "/admin/all-users",
            null,
            "Admin Dashboard",
            null,
            "admin",
          ),
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/home">
          <img src={logoImg} alt="RoomsDekho Logo" className="navbar-logo" />
        </Link>
      </div>

      <ul className="nav-links">
        {renderLink("/home", null, "Home", null, "home")}
        {renderLink("/about", null, "About", null, "about")}

        {!isLoggedIn || userRole === "ROLE_USER"
          ? renderLink("/search", null, "Search Rooms", null, "search")
          : null}

        {/* FIXED: Role specific links rendering with unique keys */}
        {isLoggedIn && getRoleLinks()}

        {/* SETTINGS DROPDOWN */}
        {isLoggedIn && (
          <li className="settings-menu" ref={menuRef} key="settings-dropdown">
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
                  <User size={16} /> Profile
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
                  <LogOut size={16} /> Logout
                </button>

                <button
                  className="reset-password-btn"
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/forgot-password"); // Link updated
                  }}
                >
                  <FolderLock size={16} /> Reset Password
                </button>
              </div>
            )}
          </li>
        )}

        {!isLoggedIn && (
          <li key="login-btn">
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
