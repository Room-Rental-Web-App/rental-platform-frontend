import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import { User, LogOut, Settings, ChevronDown, ChevronUp } from "lucide-react";

import "../css/Navbar.css";
import logoImg from "../assets/logo.png";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();

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
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <User size={20} /> Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
