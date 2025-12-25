import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/apiConfig.js"; // Ensure login: http://localhost:8080/api/auth/login is here
import "../../css/Login.css";
import { Lock, Mail, LogIn, AlertCircle } from "lucide-react";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Backend ko direct Email aur Password bhej rahe hain
      // Password backend par BCrypt encoder se match hoga
      const res = await axios.post(API_ENDPOINTS.LOGIN_REQUEST, {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
      
        if (res.data.role) {
          localStorage.setItem("role", res.data.role);
        }

        onLoginSuccess();

        navigate("/home");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Invalid Email or Password";
      setError(errMsg);

      if (errMsg.toLowerCase().includes("verify")) {
        setError("Account not verified! Please register/verify again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-header">
          <LogIn size={40} className="header-icon" />
          <h2>Welcome Back</h2>
          <p>Please enter your details</p>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <div className="input-wrapper">
            <Mail size={20} className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-wrapper">
            <Lock size={20} className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? (
            <span className="loader">Logging in...</span>
          ) : (
            <>
              Login <LogIn size={18} />
            </>
          )}
        </button>

        <p className="toggle-text">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
