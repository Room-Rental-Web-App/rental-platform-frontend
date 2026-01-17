import React, { useState } from "react"; // Added useState
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import {
  User,
  LogOut,
  Search,
  Heart,
  ShieldCheck,
  Menu,
  X,
  Crown, // Added Menu & X icons
} from "lucide-react";
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="glass-navbar">
      <div className="nav-main-wrapper">
        {/* Top Row: Logo & Icons */}
        <div className="nav-top-row">
          <div className="nav-logo">
            <Link to="/home">
              Room<span>Dekho</span>
            </Link>
          </div>

          <div className="nav-top-actions">
            {isLoggedIn && userRole === "ROLE_USER" && (
              <Link to="/wishlist" className="nav-icon-link hide-mobile">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="wish-count">{wishlistCount}</span>
                )}
              </Link>
            )}
            <ThemeToggle />

            {/* Hamburger Button for Mobile */}
            <button className="hamburger-btn" onClick={toggleMenu}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div className="nav-divider hide-mobile"></div>

        {/* Bottom Row: Desktop Links & User Area */}
        <div className={`nav-bottom-row ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-menu">
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/home">Home</Link>
            </li>
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <Link to="/about">About</Link>
            </li>

            {isLoggedIn && (
              <>
                {userRole === "ROLE_USER" && (
                  <>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/search">Search Rooms</Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/premium" className="go-gold">
                        Go Premium
                      </Link>
                    </li>
                  </>
                )}
                {userRole === "ROLE_OWNER" && (
                  <>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/add-room">Add Room</Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/my-listings">My Rooms</Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/premium" className="go-gold">
                        Go Premium
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>

          <div className="nav-user-area">
            {isLoggedIn ? (
              <div className="user-profile-badge">
                <ShieldCheck size={16} className="gold-icon" />
                <span className="user-role-label">
                  {userRole?.replace("ROLE_", "")}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="logout-btn-minimal"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-login-btn"
              >
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
