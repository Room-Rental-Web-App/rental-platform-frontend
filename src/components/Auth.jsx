import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../css/Auth.css";
import { Lock, Mail, Home, Phone, Upload, UserCircle, AlertCircle } from "lucide-react";
import Api from "../api/Api";

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

    data.role === "ROLE_ADMIN" ? nav("/admin/all-users") : nav("/home");

    window.location.reload();
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const r = await axios.post(API_ENDPOINTS.LOGIN_REQUEST, {
        email: form.email,
        password: form.password,
      });

      handleSuccessfulLogin(r.data);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      // AFTER REGISTER -> GO TO OTP PAGE
      nav("/verify-otp", { state: { email: form.email } });

    } catch (err) {
      setError(err.response?.data || "Registration failed. User may exist.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-card-wrapper">
      <div className="form-side">
        <form className="login-form" onSubmit={mode === "login" ? login : register}>

          <h2>{mode === "login" ? "Login" : "Register"}</h2>

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} /> <span>{error}</span>
            </div>
          )}

          <div className="input-group">
            <Mail size={18} className="field-icon" />
            <input name="email" type="email" placeholder="Email" onChange={set} required />
          </div>

          <div className="input-group">
            <Lock size={18} className="field-icon" />
            <input name="password" type="password" placeholder="Password" onChange={set} required />
          </div>

          {mode === "register" && (
            <>
              <div className="input-group">
                <UserCircle size={18} className="field-icon" />
                <select name="role" value={form.role} onChange={set}>
                  <option value="ROLE_USER">Tenant</option>
                  <option value="ROLE_OWNER">Owner</option>
                </select>
              </div>

              <div className="input-group">
                <Phone size={18} className="field-icon" />
                <input name="phone" placeholder="Phone" onChange={set} required />
              </div>

              <div className="input-group file-input-wrapper">
                <Upload size={18} className="field-icon" />
                <input type="file" onChange={handleFileChange} required />
              </div>
            </>
          )}

          <button className="login-btn" disabled={loading}>
            {loading ? "Processing..." : mode === "login" ? "Login" : "Register"}
          </button>

          <div className="toggle-container">
            {mode === "login" ? (
              <>
                <p>
                  New here? <span onClick={() => setMode("register")}>Create Account</span>
                </p>
                <p>
                  <span onClick={() => nav("/forgot-password")}>
                    Forgot Password?
                  </span>
                </p>
                <p>
                  <span onClick={() => nav("/reset-password")}>
                    Reset Password?
                  </span>
                </p>

              </>

            ) : (
              <p>
                Already have an account? <span onClick={() => setMode("login")}>Login</span>
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
