import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiConfig";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS/Auth.css";
import { ShieldCheck, AlertCircle } from "lucide-react";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        email: email,
        otp: otp,
      });

      alert("Registration successful! You can now login.");
      nav("/auth");
    } catch {
      setError("Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <div className="auth-card-wrapper">
      <div className="form-side">
        <form className="login-form" onSubmit={verifyOtp}>
          <h2>Verify OTP</h2>

          {error && (
            <div className="error-banner"> <AlertCircle size={18} /> <span>{error}</span></div>
          )}

          <div className="input-group">
            <ShieldCheck size={18} className="field-icon" />
            <input placeholder="Enter 6-digit OTP" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
