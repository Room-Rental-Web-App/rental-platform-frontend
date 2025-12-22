import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import "./CSS/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">MyBrand</div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="login-link"
              style={{ border: "none", cursor: "pointer" }}
            >
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
    </nav>
  );
};

export default Navbar;
