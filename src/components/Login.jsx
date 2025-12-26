import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../css/Login.css"
import {
  Lock, Mail, LogIn, ShieldCheck, ArrowRight, UserCircle, AlertCircle
} from "lucide-react";

export default function Auth({ onLoginSuccess }) {

  const [mode, setMode] = useState("login"); // login | register | otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "", password: "", otp: "", role: "ROLE_USER"
  });

  const nav = useNavigate();

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ================= LOGIN =================
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
    } catch {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  // ================= REGISTER =================
  const register = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, {
        email: form.email,
        password: form.password,
        role: form.role
      });
      setMode("otp");
    } catch {
      setError("User already exists");
    }
    setLoading(false);
  };

  // ================= OTP =================
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

  // ================= UI =================
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={
        mode === "login" ? login :
        mode === "register" ? register : verifyOtp
      }>

        <h2>{mode === "login" ? "Login" : mode === "register" ? "Create Account" : "Verify OTP"}</h2>

        {error && <div className="error-banner"><AlertCircle size={16}/> {error}</div>}

        {mode !== "otp" && (
          <>
            <div className="input-group">
              <Mail size={18}/>
              <input name="email" placeholder="Email" onChange={set} required/>
            </div>

            <div className="input-group">
              <Lock size={18}/>
              <input type="password" name="password" placeholder="Password" onChange={set} required/>
            </div>
          </>
        )}

        {mode === "register" && (
          <div className="input-group">
            <UserCircle size={18}/>
            <select name="role" onChange={set}>
              <option value="ROLE_USER">Tenant</option>
              <option value="ROLE_OWNER">Owner</option>
            </select>
          </div>
        )}

        {mode === "otp" && (
          <div className="input-group">
            <ShieldCheck size={18}/>
            <input name="otp" placeholder="6 digit OTP" maxLength="6" onChange={set} required/>
          </div>
        )}

        <button className="login-btn" disabled={loading}>
          {loading ? "Processing..." :
            mode === "login" ? <>Login <LogIn size={16}/></> :
            mode === "register" ? <>Get OTP <ArrowRight size={16}/></> :
            "Verify OTP"}
        </button>

        {mode === "login" && <p className="toggle-text">New here? <span onClick={()=>setMode("register")}>Create Account</span></p>}
        {mode === "register" && <p className="toggle-text">Already have account? <span onClick={()=>setMode("login")}>Login</span></p>}
      </form>
    </div>
  );
}
