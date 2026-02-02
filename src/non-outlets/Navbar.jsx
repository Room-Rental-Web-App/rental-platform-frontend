import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate add kiya password reset ke liye
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";

import { User, LogOut, Settings, ChevronDown, ChevronUp  } from "lucide-react";
import { FolderLock, User, LogOut, Settings, ChevronDown } from "lucide-react";


import "../css/Navbar.css";
import logoImg from "../assets/logo.png";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleLinks = {
    ROLE_USER: (
      <>
        <Link to="/wishlist" className="nav-link">
          Wishlist
          {wishlistCount > 0 && (
            <span className="wishlist-badge">{wishlistCount}</span>
          )}
        </Link>
        <Link to="/premium" className="nav-link">Premium</Link>
      </>
    ),

    ROLE_OWNER: (
      <>
        <Link to="/add-room" className="nav-link">Add Room</Link>
        <Link to="/my-listings" className="nav-link">My Rooms</Link>
        <Link to="/premium" className="nav-link">Premium</Link>
        <Link to="/owner/users" className="nav-link">Users</Link>
      </>
    ),

    ROLE_ADMIN: (
      <Link to="/admin/all-users" className="nav-link">
        Dashboard
      </Link>
    ),
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

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/home">
          <img src={logoImg} alt="RoomsDekho" className="navbar-logo" />
        </Link>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>

        {(!isLoggedIn || userRole === "ROLE_USER") && (
          <Link to="/search" className="nav-link">Search Rooms</Link>
        )}

        {isLoggedIn && roleLinks[userRole]}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {isLoggedIn ? (
          <div className="settings-menu" ref={menuRef}>
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
              {openMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openMenu && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setOpenMenu(false)}>
                  <User size={16} /> Profile
                </Link>

                <ThemeToggle />

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
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <User size={20} /> Login
          </Link>
        )}
      </div>

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
