import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/apiConfig";
import Api from "../../api/Api";
import { Mail, CheckCircle, X, AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import PasswordInput from "./PasswordInput";
import ErrorBanner from "./ErrorBanner";
import InputWithIcon from "./InputWithIcon";
import "../../CSS/premiumModel.css";

// ─── useToast Hook ─────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  return { toasts, addToast, removeToast };
}

// ─── Toast Component ───────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" && <CheckCircle size={18} />}
            {toast.type === "error" && <X size={18} />}
            {toast.type === "info" && <AlertCircle size={18} />}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Login Component ───────────────────────────────────────────────────────────
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toasts, addToast, removeToast } = useToast();

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSuccessfulLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("phone", data.phone);

    addToast(
      `🎉 Welcome back, ${data.fullName || data.email}!`,
      "success",
      2500,
    );

    // Slight delay so toast is visible before redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN_REQUEST, form);
      handleSuccessfulLogin(response.data);
    } catch (err) {
      const message = err.response?.data || "Login failed.";
      setError(message);
      addToast(message, "error");

      if (message === "Account not verified. Please verify OTP first.") {
        addToast("Account not verified. Sending OTP…", "info");

        try {
          await Api.post(`/auth/send-otp/${form.email}`);
          addToast("OTP sent! Redirecting to verification…", "success", 2000);
          setTimeout(() => {
            navigate("/verify-otp", { state: { email: form.email } });
          }, 1500);
        } catch {
          addToast("Failed to send OTP. Please try again.", "error");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to access your account.">
      <Toast toasts={toasts} removeToast={removeToast} />

      <form className="login-form" onSubmit={login}>
        <div className="login-header-group">
          <h2>Welcome to Finder & Owner</h2>
          <p className="login-sub-msg">Login to continue your journey</p>
        </div>

        <ErrorBanner message={error} />

        <InputWithIcon
          icon={Mail}
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <PasswordInput
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button className="login-btn" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="toggle-container">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Sign up / Registration
            </span>
          </p>
          <div className="forgot-links">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
