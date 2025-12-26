import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../css/Login.css";
import {
  Lock, Mail, LogIn, ShieldCheck, ArrowRight, UserCircle, AlertCircle, Home
} from "lucide-react";

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "", password: "", otp: "", role: "ROLE_USER"
  });

  const nav = useNavigate();
  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const login = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await axios.post(API_ENDPOINTS.LOGIN_REQUEST, {
        email: form.email, password: form.password
      });
      localStorage.setItem("token", r.data.token);
      localStorage.setItem("email", r.data.email);
      localStorage.setItem("role", r.data.role);
      onLoginSuccess();
      nav("/home");
    } catch(e) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const register = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, {
        email: form.email, password: form.password, role: form.role
      });
      setMode("otp");
    } catch {
      setError("User already exists");
    }
    setLoading(false);
  };

  const verifyOtp = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        email: form.email, otp: form.otp
      });
      alert("Registration successful!");
      setMode("login");
    } catch {
      setError("Invalid OTP");
    }
    setLoading(false);
  };

  return (

      <div className={`auth-card-wrapper ${mode === "register" ? "reverse" : ""}`}>
        
        {/* VISUAL SIDE */}
        <div className="visual-side">
          <div className="visual-overlay"></div>
          <div className="visual-content" key={mode}>
            <Home size={60} className="visual-icon" />
            <h2>{mode === "login" ? "Welcome Back!" : "Start Your Journey"}</h2>
            <p>
              {mode === "login" 
                ? "Login to manage your listings and find your next home." 
                : "Join thousands of users finding perfect properties every day."}
            </p>
          </div>
        </div>

        {/* FORM SIDE - key={mode} triggers the entry animation */}
        <div className="form-side" key={mode}>
          <form className="login-form" onSubmit={
            mode === "login" ? login : mode === "register" ? register : verifyOtp
          }>
            <div className="form-header">
              <h2>{mode === "login" ? "Login" : mode === "register" ? "Create Account" : "Verify OTP"}</h2>
              <p>Please enter your details below</p>
            </div>

            {error && (
              <div className="error-banner">
                <AlertCircle size={18} /> <span>{error}</span>
              </div>
            )}

            <div className="form-fields">
              {mode !== "otp" && (
                <>
                  <div className="input-group">
                    <Mail size={18} className="field-icon" />
                    <input name="email" type="email" placeholder="Email Address" onChange={set} required />
                  </div>

                  <div className="input-group">
                    <Lock size={18} className="field-icon" />
                    <input type="password" name="password" placeholder="Password" onChange={set} required />
                  </div>
                </>
              )}

              {mode === "register" && (
                <div className="input-group">
                  <UserCircle size={18} className="field-icon" />
                  <select name="role" onChange={set}>
                    <option value="ROLE_USER">Tenant</option>
                    <option value="ROLE_OWNER">Owner</option>
                  </select>
                </div>
              )}

              {mode === "otp" && (
                <div className="input-group">
                  <ShieldCheck size={18} className="field-icon" />
                  <input name="otp" placeholder="Enter 6-digit OTP" maxLength="6" onChange={set} required />
                </div>
              )}
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? "Processing..." : 
                mode === "login" ? <>Login <LogIn size={18} /></> : 
                mode === "register" ? <>Get OTP <ArrowRight size={18} /></> : 
                "Verify OTP"}
            </button>

            <div className="toggle-container">
              {mode === "login" ? (
                <p>New here? <span onClick={() => { setMode("register"); setError(""); }}>Create Account</span></p>
              ) : (
                <p>Already have an account? <span onClick={() => { setMode("login"); setError(""); }}>Login</span></p>
              )}
            </div>
          </form>
        </div>
      </div>

  );
}