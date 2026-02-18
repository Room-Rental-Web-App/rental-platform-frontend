import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../css/Auth.css";
import { Lock, Mail, Phone, Upload, AlertCircle, Loader2 } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aadharFile, setAadharFile] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ROLE_USER",
    phone: "",
  });

  const nav = useNavigate();

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setAadharFile(e.target.files[0]);

  const handleSuccessfulLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("phone", data.phone);
    nav("/");
    window.location.reload();
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await axios.post(API_ENDPOINTS.LOGIN_REQUEST, {
        email: form.email,
        password: form.password,
      });
      handleSuccessfulLogin(r.data);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      formData.append("phone", form.phone);
      if (aadharFile) formData.append("aadharCard", aadharFile);

      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      nav("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      setError(err.response?.data || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card-wrapper">
      <div className="auth-container-card">
        {/* Left Side: Brand Image */}
        <div className="auth-image-side">
          <h1>RoomsDekho</h1>
          <p>
            The smartest way to find your next home. Join our verified community
            of owners and tenants today.
          </p>
        </div>

        {/* Right Side: Form Content */}
        <div className="form-side">
          <div className="login-form">
            <h2>{mode === "login" ? "Sign In" : "Get Started"}</h2>
            <p className="subtitle">
              {mode === "login"
                ? "Welcome back! Please enter your details."
                : "Create an account to start exploring."}
            </p>

            {error && (
              <div className="error-banner">
                <AlertCircle size={18} /> <span>{error}</span>
              </div>
            )}

            <form onSubmit={mode === "login" ? login : register}>
              {mode === "register" && (
                <div className="role-pill-container">
                  <button
                    type="button"
                    className={`role-pill ${form.role === "ROLE_USER" ? "active" : ""}`}
                    onClick={() => setForm({ ...form, role: "ROLE_USER" })}
                  >
                    Tenant
                  </button>
                  <button
                    type="button"
                    className={`role-pill ${form.role === "ROLE_OWNER" ? "active" : ""}`}
                    onClick={() => setForm({ ...form, role: "ROLE_OWNER" })}
                  >
                    Owner
                  </button>
                </div>
              )}

              <div className="input-group">
                <Mail size={18} className="field-icon" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={set}
                  required
                />
              </div>

              <div className="input-group">
                <Lock size={18} className="field-icon" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={set}
                  required
                />
              </div>

              {mode === "register" && (
                <>
                  <div className="input-group">
                    <Phone size={18} className="field-icon" />
                    <input
                      name="phone"
                      placeholder="Phone Number"
                      onChange={set}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <Upload size={18} className="field-icon" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      style={{ paddingLeft: "46px" }}
                    />
                  </div>
                </>
              )}

              <button className="login-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={20} className="spinner" />
                    <span>Processing...</span>
                  </>
                ) : mode === "login" ? (
                  "Login"
                ) : (
                  "Register Now"
                )}
              </button>

              <div className="toggle-container">
                {mode === "login" ? (
                  <>
                    <p>
                      New here?{" "}
                      <span onClick={() => setMode("register")}>
                        Create Account
                      </span>
                    </p>
                    <div className="forgot-links">
                      <span onClick={() => nav("/forgot-password")}>
                        Forgot Password?
                      </span>
                    </div>
                  </>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span onClick={() => setMode("login")}>Login</span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
