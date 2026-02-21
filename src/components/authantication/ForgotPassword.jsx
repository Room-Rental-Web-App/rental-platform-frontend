import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import { Mail } from "lucide-react";

import AuthLayout from "./AuthLayout";
import InputWithIcon from "./InputWithIcon";
import PasswordInput from "./PasswordInput";
import StrengthMeter from "./StrengthMeter";
import ErrorBanner from "./ErrorBanner";

export default function ForgotPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ⏳ Countdown logic
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // =========================
  // SEND OTP
  // =========================
  const sendOtp = async (e) => {
    if (e) e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await Api.post("/auth/forgot-password-otp", { email });
      setStep("otp");
      setTimer(60);
    } catch {
      setError("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await Api.post("/auth/forgot-verify-otp", { email, otp });
      setStep("reset");
    } catch {
      setError("Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE PASSWORD
  // =========================
  const updatePassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await Api.post("/auth/forgot-password", {
        email,
        password: newPassword,
      });

      navigate("/login");
    } catch {
      setError("Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit =
    step === "email"
      ? sendOtp
      : step === "otp"
      ? verifyOtp
      : updatePassword;

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Recover your account."
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <ErrorBanner message={error} />

        {/* EMAIL STEP */}
        {step === "email" && (
          <InputWithIcon
            icon={Mail}
            type="email"
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <div className="input-group">
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="otp-timer">
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <span
                  className="resend-link"
                  onClick={!loading ? sendOtp : undefined}
                  style={{ cursor: "pointer" }}
                >
                  Resend OTP
                </span>
              )}
            </div>
          </>
        )}

        {/* RESET STEP */}
        {step === "reset" && (
          <>
            <PasswordInput
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />

            <StrengthMeter password={newPassword} />

            <PasswordInput
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm Password"
            />

            {confirmPassword && (
              <div className="match-indicator">
                {newPassword === confirmPassword ? (
                  <span style={{ color: "green" }}>
                    Passwords match
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    Passwords do not match
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {/* BUTTON */}
        <button className="login-btn" disabled={loading}>
          {loading ? (
            <span className="loading-btn">
              <span className="spinner"></span>
              Please wait...
            </span>
          ) : step === "email" ? (
            "Send OTP"
          ) : step === "otp" ? (
            "Verify OTP"
          ) : (
            "Set Password"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}