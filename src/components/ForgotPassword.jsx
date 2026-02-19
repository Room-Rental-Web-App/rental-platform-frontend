import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import "../CSS/Auth.css";
import { Mail, Lock, AlertCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const sendOtp = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Enter email first");
      return;
    }

    setLoading(true);

    Api.post("/auth/forgot-password-otp", {
      email: email,
    })
      .then(() => {
        alert("OTP Sent Successfully");
        setOtpSent(true);
        setError("");
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to send OTP");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Enter OTP");
      return;
    }

    setLoading(true);

    Api.post("/auth/forgot-verify-otp", {
      email: email,
      otp: otp,
    })
      .then(() => {
        alert("OTP Verified Successfully");
        setOtpVerified(true);
        setError("");
      })
      .catch(() => {
        setError("Invalid OTP");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Enter new password");
      return;
    }

    setLoading(true);

    Api.post("/auth/forgot-password", {
      email: email,
      password: newPassword,
    })
      .then(() => {
        alert("Password Reset Successful!");
        nav("/login");
      })
      .catch(() => {
        setError("Failed to reset password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-card-wrapper">
      <div className="form-side">
        <form
          className="login-form"
          onSubmit={
            otpVerified ? updatePassword : otpSent ? verifyOtp : sendOtp
          }
        >
          <h2>Forgot Password</h2>

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} /> <span>{error}</span>
            </div>
          )}

          <div className="input-group">
            <Mail size={18} className="field-icon" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              required
            />
          </div>

          {otpSent && !otpVerified && (
            <div className="input-group">
              <Lock size={18} className="field-icon" />
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          {otpVerified && (
            <div className="input-group">
              <Lock size={18} className="field-icon" />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button className="login-btn" disabled={loading}>
            {loading
              ? "Processing..."
              : otpVerified
              ? "Set New Password"
              : otpSent
              ? "Verify OTP"
              : "Send OTP"}
          </button>

          <div className="toggle-container">
            <p>
              Back to{" "}
              <span onClick={() => nav("/login")}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
