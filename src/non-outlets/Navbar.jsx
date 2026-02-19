import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import {
  Menu,
  X,
  User,
  Users,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Home,
  Info,
  Search,
  Heart,
  Crown,
  LayoutDashboard,
  PlusCircle,
  Building2,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
// Hook import kiya status check karne ke liye
import usePremiumStatus from "../customHook/usePremiumStatus";

import "../CSS/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = ({ isLoggedIn, onLogout, isPremiumUser }) => {
  const { wishlistCount } = useWishlist();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navTo = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Premium status check
  const { premium } = usePremiumStatus();
  const showBadge = premium || isPremiumUser;

  const menuRef = useRef(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [isLoggedIn]);

  useEffect(() => {
    if (mobileMenu) return;

    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileMenu]);

  /* ======================
      SHARED NAV LINKS
  ====================== */
  const NavLinks = ({ onClick, variant = "desktop" }) => {
    const isMobile = variant === "mobile";

    return (
      <>
        <Link className="nav-link" to="/home" onClick={onClick}>
          {isMobile && <Home />} Home
        </Link>

        <Link className="nav-link" to="/about" onClick={onClick}>
          {isMobile && <Info />} About
        </Link>

        {(!isLoggedIn || role === "ROLE_USER") && (
          <Link className="nav-link" to="/search" onClick={onClick}>
            {isMobile && <Search />} Search Rooms
          </Link>
        )}

        {isLoggedIn && role === "ROLE_USER" && (
          <>
            <Link className="nav-link" to="/wishlist" onClick={onClick}>
              {isMobile && <Heart />}
              Saved Rooms
              {wishlistCount > 0 && (
                <span className="wishlist-badge">{wishlistCount}</span>
              )}
            </Link>

            <Link className="nav-link" to="/premium" onClick={onClick}>
              {isMobile && <Crown />} Premium
            </Link>
          </>
        )}

        {isLoggedIn && role === "ROLE_OWNER" && (
          <>
            <Link className="nav-link" to="/add-room" onClick={onClick}>
              {isMobile && <PlusCircle />} List Room
            </Link>

            <Link className="nav-link" to="/my-listings" onClick={onClick}>
              {isMobile && <Building2 />} My Listings
            </Link>

            <Link className="nav-link" to="/premium" onClick={onClick}>
              {isMobile && <Crown />} Premium
            </Link>

            <Link className="nav-link" to="/owner/users" onClick={onClick}>
              {isMobile && <Users />} Users
            </Link>
          </>
        )}

        {isLoggedIn && role === "ROLE_ADMIN" && (
          <Link className="nav-link" to="/admin/all-users" onClick={onClick}>
            {isMobile && <LayoutDashboard />} Dashboard
          </Link>
        )}
      </>
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/home">
            <img
              src={logo}
              alt="Logo"
              className={`navbar-logo ${theme === "dark" ? "dark-logo" : "light-logo"}`}
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="nav-center desktop-nav">
          <NavLinks />
        </div>

        <div className="nav-right">
          <button
            className="settings-btn hamburger"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
          {!isLoggedIn && (
            <button className="settings-btn" onClick={() => navTo("/login")}>
              <User size={18} />
              <span>Login</span>
            </button>
          )}
          {isLoggedIn && (
            <div className="settings-menu" ref={menuRef}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Premium Badge inject kiya */}
                {showBadge && (
                  <div className="nav-premium-tag">
                    <Crown size={12} fill="currentColor" />
                    <span>PREMIUM</span>
                  </div>
                )}
                <button
                  className="settings-btn"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <Settings size={18} />
                  {openMenu ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>

              {openMenu && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setOpenMenu(false)}>
                    <User size={16} /> Profile
                  </Link>

                  <ThemeToggle setTheme={setTheme} theme={theme} />

                  {role === "ROLE_USER" && (
                    <Link to="/notify_rooms" onClick={() => setOpenMenu(false)}>
                      <MessageCircle size={16} /> Notify Rooms
                    </Link>
                  )}

                  <button onClick={onLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${mobileMenu ? "open" : ""}`}>
        <div className="drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={logo}
              alt="Logo"
              className={`navbar-logo drawer-logo ${theme === "dark" ? "dark-logo" : "light-logo"}`}
            />
            {showBadge && <Crown size={18} color="#FFD700" fill="#FFD700" />}
          </div>

          <button
            className="settings-btn"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <NavLinks variant="mobile" onClick={() => setMobileMenu(false)} />
      </div>

      {mobileMenu && (
        <div className="nav-backdrop" onClick={() => setMobileMenu(false)} />
      )}
    </>
  );
};

export default Navbar;
