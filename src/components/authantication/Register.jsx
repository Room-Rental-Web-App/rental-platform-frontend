import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/apiConfig";
import AuthLayout from "./AuthLayout";
import {
  Lock,
  Mail,
  Phone,
  Upload,
  AlertCircle,
  Loader2,
  EyeOff,
  Eye,
  CheckCircle,
  X,
} from "lucide-react";
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

// ─── Register Component ────────────────────────────────────────────────────────
export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ROLE_USER",
    phone: "",
  });

  const strength =
    (form.password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(form.password) ? 1 : 0) +
    (/[0-9]/.test(form.password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(form.password) ? 1 : 0);

  const [aadharFile, setAadharFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setError("");

    // Validation toasts
    if (form.role === "ROLE_OWNER" && !aadharFile) {
      const msg = "Aadhar card is required for owner registration.";
      setError(msg);
      addToast(msg, "error");
      return;
    }

    if (strength < 3) {
      const msg = "Password is too weak. Use uppercase, numbers & symbols.";
      setError(msg);
      addToast(msg, "error");
      return;
    }

    setLoading(true);
    setLoadingText("Creating your account");
    addToast("Creating your account…", "info", 6000);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value),
      );
      if (aadharFile) formData.append("aadharCard", aadharFile);

      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      addToast(
        "✅ Account created! Redirecting to OTP verification…",
        "success",
        3000,
      );

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: form.email } });
      }, 1200);
    } catch (err) {
      const msg = err.response?.data || "Registration failed.";
      setError(msg);
      addToast(msg, "error");
    } finally {
      setLoading(false);
      setLoadingText("");
    }
  };

  return (
    <AuthLayout
      title="Join RoomsDekho"
      subtitle="Create your account to list or find trusted properties."
    >
      <Toast toasts={toasts} removeToast={removeToast} />

      <form className="login-form" onSubmit={register}>
        <h2>Create Account</h2>

        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Role Selector */}
        <div className="role-pill-container">
          {["ROLE_USER", "ROLE_OWNER"].map((role) => (
            <button
              key={role}
              type="button"
              className={`role-pill ${form.role === role ? "active" : ""}`}
              onClick={() => {
                setForm({ ...form, role });
                addToast(
                  role === "ROLE_USER"
                    ? "Switched to Room Finder mode 🔍"
                    : "Switched to Room Owner mode 🏠",
                  "info",
                  2000,
                );
              }}
            >
              {role === "ROLE_USER" ? "Room Finder" : "Room Owner"}
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="input-group">
          <Mail size={18} className="field-icon" />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="input-group password-group">
          <Lock size={18} className="field-icon" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Strength Meter */}
        <div className="strength-meter">
          <div className={`strength-bar strength-${strength}`} />
        </div>

        {/* Phone */}
        <div className="input-group">
          <Phone size={18} className="field-icon" />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </div>

        {/* Aadhar Upload (Owner only) */}
        {form.role === "ROLE_OWNER" && (
          <div className="input-group">
            <label className="file-label">
              Please Upload Aadhar Card For Verification
            </label>
            <div className="file-wrapper">
              <Upload size={18} className="field-icon" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setAadharFile(e.target.files[0]);
                  if (e.target.files[0]) {
                    addToast("Aadhar card uploaded ✅", "success", 2000);
                  }
                }}
              />
            </div>
          </div>
        )}

        <button className="login-btn" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="spinner" />
              {loadingText}...
            </>
          ) : (
            "Register"
          )}
        </button>

        <div className="toggle-container">
          <p>
            Already registered?{" "}
            <span onClick={() => navigate("/auth")}>Login</span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
