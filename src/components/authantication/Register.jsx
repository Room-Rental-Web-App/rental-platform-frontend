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
} from "lucide-react";

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

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    setError("");

    if (form.role === "ROLE_OWNER" && !aadharFile) {
      setError("Aadhar card is required for owner registration.");
      return;
    }

    if (strength < 3) {
      setError("Password is too weak.");
      return;
    }


    setLoading(true);
    setLoadingText("Creating your account");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (aadharFile) formData.append("aadharCard", aadharFile);

      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/verify-otp", {
        state: { email: form.email },
      });
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
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
      <form className="login-form" onSubmit={register}>
        <h2>Create Account</h2>

        {error && (
          <div className="error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="role-pill-container">
          {["ROLE_USER", "ROLE_OWNER"].map((role) => (
            <button
              key={role}
              type="button"
              className={`role-pill ${form.role === role ? "active" : ""
                }`}
              onClick={() => setForm({ ...form, role })}
            >
              {role === "ROLE_USER" ? "Tenant" : "Owner"}
            </button>
          ))}
        </div>

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
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </span>
        </div>
        <div className="strength-meter">
          <div className={`strength-bar strength-${strength}`} />
        </div>

        <div className="input-group">
          <Phone size={18} className="field-icon" />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </div>

        {form.role === "ROLE_OWNER" && (
          <div className="input-group">
            <label className="file-label">
              Upload Aadhar Card
            </label>
            <div className="file-wrapper">
              <Upload size={18} className="field-icon" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setAadharFile(e.target.files[0])
                }
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
            <span onClick={() => navigate("/auth")}>
              Login
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}