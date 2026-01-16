import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useWishlist } from "../context/WishlistContext";
import { User, LogOut, LayoutDashboard, PlusCircle, Search, Heart } from "lucide-react";
import "../css/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const userRole = localStorage.getItem("role");
  const { wishlistCount } = useWishlist();

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
      renderLink( "/wishlist", null, "Wishlist",
        wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>
      ),
      renderLink("/premium", null, "Premium"),
    ],

    ROLE_OWNER: [
      renderLink("/add-room", null, "Add Room"),
      renderLink("/my-listings", null, "My Rooms"),
      renderLink("/premium", null, "Premium"),
    ],

    ROLE_ADMIN: [
      renderLink("/admin/all-users", null, "Admin Dashboard"),
    ],
  };

  return (
    <nav className="navbar">
      <div className="logo">MyBrand</div>

      <ul className="nav-links">
        {renderLink("/home", null, "Home")}
        {renderLink("/about", null, "About")}

        {!isLoggedIn && renderLink("/search", null, "Search Rooms")}

        {isLoggedIn && roleLinks[userRole]}

        <li>
          {isLoggedIn ? (
            <button onClick={onLogout} className="login-link">
              <LogOut size={20} />
              <span>Logout</span>
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
