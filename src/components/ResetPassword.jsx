import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import "../CSS/Auth.css";
import { Lock, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = form;

    // ===== FRONTEND VALIDATIONS =====

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    const email = localStorage.getItem("email");

    if (!email) {
      setError("User not logged in");
      return;
    }

    setLoading(true);

    // ===== API CALL =====

    Api.post("/auth/reset-password", {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
      .then(() => {
        alert("Password Updated Successfully!");

        // clear form
        setForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        nav("/profile");
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to reset password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-card-wrapper">
      <div className="form-side">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} /> <span>{error}</span>
            </div>
          )}


          <div className="input-group">
            <Lock size={18} className="field-icon" />
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="field-icon" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="field-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Processing..." : "Update Password"}
          </button>

          <div className="toggle-container">
            <p>
              Back to{" "}
              <span onClick={() => nav("/profile")}>
                Profile
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
