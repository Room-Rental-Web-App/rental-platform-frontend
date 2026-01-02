import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../css/Login.css";
import { Lock, Mail, LogIn, ShieldCheck, ArrowRight, UserCircle, AlertCircle, Home, Phone, Upload, } from "lucide-react";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import Api from "../api/Api";

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aadharFile, setAadharFile] = useState(null); // Naya state file ke liye
  const [form, setForm] = useState({ email: "", password: "", otp: "", role: "ROLE_USER", phone: "", });
  const [googlePending, setGooglePending] = useState(false);
  const [googleEmail, setGoogleEmail] = useState(null);


  const nav = useNavigate();
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleLogin = async (googleToken) => {
    const r = await axios.post(API_ENDPOINTS.GOOGLE_LOGIN, { token: googleToken });

    if (r.data.role == null) {
      setGooglePending(true);
      setGoogleEmail(r.data.email);
      return;
    }
    localStorage.setItem("token", r.data.token);
    localStorage.setItem("email", r.data.email);
    localStorage.setItem("role", r.data.role);
    onLoginSuccess();
    nav("/home");
  };


  // File change handler
  const handleFileChange = (e) => setAadharFile(e.target.files[0]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await axios.post(API_ENDPOINTS.LOGIN_REQUEST, {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", r.data.token);
      localStorage.setItem("email", r.data.email);
      localStorage.setItem("role", r.data.role);

      onLoginSuccess();
      nav("/home");
    } catch (e) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const completeGoogleProfile = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("email", googleEmail);
    fd.append("role", form.role);
    fd.append("aadharCard", aadharFile);

    Api.post("/auth/google/complete-registration", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => {
      console.log(r.data);
      localStorage.setItem("token", r.data.token);
      localStorage.setItem("email", r.data.email);
      localStorage.setItem("role", r.data.role);
      onLoginSuccess()
      nav("/home");
    }).catch(() => {
      setError("Profile completion failed. Try again.");
    });
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // FormData use karenge kyunki image bhejni hai
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      formData.append("phone", form.phone);


      formData.append("phone", form.phone);
      if (aadharFile) formData.append("aadharCard", aadharFile);


      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMode("otp");
    } catch (err) {
      setError(err.response?.data || "Registration failed. User may exist.");
    }
    setLoading(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        email: form.email,
        otp: form.otp,
      });
      alert(
        "Registration successful! Admin will verify your profile if you are an owner."
      );
      setMode("login");
    } catch {
      setError("Invalid OTP");
    }
    setLoading(false);
  };

  return (
    <div
      className={`auth-card-wrapper ${mode === "register" ? "reverse" : ""}`}
    >
      {/* VISUAL SIDE - No changes here */}
      <div className="visual-side">
        <div className="visual-overlay"></div>
        <div className="visual-content" key={mode}>
          <Home size={60} className="visual-icon" />
          <h2>{mode === "login" ? "Welcome Back!" : "Start Your Journey"}</h2>
          <p>
            {mode === "login" ? "Login to manage listings." : "Join us today!"}
          </p>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="form-side" key={mode}>
        <form
          className="login-form"
          onSubmit={
            mode === "login"
              ? login
              : mode === "register"
                ? register
                : verifyOtp
          }
        >
          <div className="form-header">
            <h2>
              {mode === "login"
                ? "Login"
                : mode === "register"
                  ? "Create Account"
                  : "Verify OTP"}
            </h2>
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={set}
                    required
                  />
                </div>
              </>
            )}

            {mode === "register" && (
              <>
                <div className="input-group">
                  <UserCircle size={18} className="field-icon" />
                  <select name="role" value={form.role} onChange={set}>
                    <option value="ROLE_USER">Tenant</option>
                    <option value="ROLE_OWNER">Owner</option>
                  </select>
                </div>


                <div className="owner-fields-animate">
                  <div className="input-group">
                    <Phone size={18} className="field-icon" />
                    <input
                      name="phone"
                      type="text"
                      placeholder="Phone Number"
                      onChange={set}
                      required
                    />
                  </div>
                  <div className="input-group file-input-wrapper">
                    <Upload size={18} className="field-icon" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                    <small className="file-label">
                      Upload Aadhar/ID Proof
                    </small>
                  </div>
                </div>

              </>
            )}

            {mode === "otp" && (
              <div className="input-group">
                <ShieldCheck size={18} className="field-icon" />
                <input
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  onChange={set}
                  required
                />
              </div>
            )}
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Processing..." : mode === "login" ? "Login" : "Get OTP"}
          </button>

          <div className="toggle-container">
            {mode === "login" ? (
              <p>
                New here?{" "}
                <span onClick={() => setMode("register")}>Create Account</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setMode("login")}>Login</span>
              </p>
            )}
          </div>

        </form>

        {googlePending && (
          <form className="google-onboard-form" onSubmit={completeGoogleProfile}>
            <h3>Complete Your Profile</h3>

            <select name="role" onChange={set} required>
              <option value="">Choose Role</option>
              <option value="ROLE_USER">Tenant</option>
              <option value="ROLE_OWNER">Owner</option>
            </select>

            <input name="phone" placeholder="Phone" onChange={set} required />
            <input type="file" onChange={handleFileChange} required />

            <button>Complete Registration</button>
          </form>
        )}
        <GoogleLogin
          onSuccess={(res) => handleGoogleLogin(res.credential)}
          onError={() => alert("Google Login Failed")}
        />

      </div>
    </div>
  );
}
