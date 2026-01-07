import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext"; // IMPORT THIS
import {
  User,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Search,
  Heart, // ADDED HEART ICON
} from "lucide-react";
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist(); // GET COUNT FROM CONTEXT

  return (
    <nav className="navbar">
      <div className="logo">MyBrand</div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>

        {isLoggedIn && (
          <>
            {userRole === "ROLE_USER" && (
              <>
                <li>
                  <Link to="/search">
                    <Search size={18} /> Search Rooms
                  </Link>
                </li>
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

                <li>
                  <Link to="/premium">
                    <LayoutDashboard size={18} /> Premium
                  </Link>
                </li>
              </>
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
                <li>
                  <Link to="/premium">
                    <LayoutDashboard size={18} /> Premium
                  </Link>
                </li>
              </>
            )}

            {userRole === "ROLE_ADMIN" && (
              <li>
                <Link to="/admin/all-users">
                  <LayoutDashboard size={18} /> Admin Dashboard
                </Link>
              </li>
            )}
          </>
        )}

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
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
