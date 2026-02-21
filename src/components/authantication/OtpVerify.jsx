import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/apiConfig";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const nav = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setLoadingText("Verifying");

    try {
      await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        email,
        otp,
      });

      nav("/auth");
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  /* ================= RESEND OTP ================= */
  const resendOtp = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setLoadingText("Resending OTP");

      await axios.post(API_ENDPOINTS.RESEND_OTP || "/auth/resend-otp", {
        email,
      });

      setTimer(60);
      setError("");
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  return (
    <div className="auth-card-wrapper">
      <div className="auth-container-card">

        {/* LEFT BRANDING */}
        <div className="auth-image-side">
          <h1>RoomsDekho</h1>
          <p>Find verified homes and trusted tenants.</p>
        </div>

        {/* FORM SIDE */}
        <div className="form-side">
          <form className="login-form" onSubmit={verifyOtp}>
            <h2>Verify Your OTP</h2>

            {error && (
              <div className="error-banner">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="input-group">
              <ShieldCheck size={18} className="field-icon" />
              <input
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                required
              />
            </div>

            <div className="resend-section">
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <span onClick={resendOtp}>
                  Resend OTP
                </span>
              )}
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spinner" />
                  {loadingText}...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            <div className="toggle-container">
              <p>
                Back to{" "}
                <span onClick={() => nav("/auth")}>
                  Login
                </span>
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}