import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import {
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Search,
  Heart,
  Crown,
  Settings,
} from "lucide-react";
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();

  return (
    <nav className="navbar">
      <div className="logo">RentalRoom</div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>

        {/* Premium Link - Everyone can see */}
        <li>
          <Link to="/premium" className="premium-nav-link">
            <Crown size={18} color="#d4af37" />{" "}
            <span style={{ color: "#d4af37", fontWeight: "bold" }}>
              Premium
            </span>
          </Link>
        </li>

        {isLoggedIn && (
          <>
            {(userRole === "ROLE_USER" || userRole === "ROLE_OWNER") && (
              <li>
                <Link to="/search">
                  <Search size={18} /> Search
                </Link>
              </li>
            )}

            {userRole === "ROLE_USER" && (
              <li>
                <Link to="/wishlist" className="wishlist-nav-link">
                  <div className="wishlist-icon-wrapper">
                    <Heart size={18} />
                    {wishlistCount > 0 && (
                      <span className="wishlist-badge">{wishlistCount}</span>
                    )}
                  </div>
                  <span>Wishlist</span>
                </Link>
              </li>
            )}

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

            {userRole === "ROLE_ADMIN" && (
              <>
                <li>
                  <Link to="/admin/all-users">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/premium-control">
                    <Settings size={18} /> Premium Mgmt
                  </Link>
                </li>
              </>
            )}
          </>
        )}

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          {isLoggedIn ? (
            <button onClick={onLogout} className="login-link logout-btn">
              <LogOut size={20} />
              <span>Logout ({userRole?.replace("ROLE_", "")})</span>
            </button>
          ) : (
            <Link to="/login" className="login-link">
              <User size={20} /> <span>Login</span>
            </Link>
          )}
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
