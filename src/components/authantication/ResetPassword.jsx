import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";

import AuthLayout from "./AuthLayout";
import PasswordInput from "./PasswordInput"
import StrengthMeter from "./StrengthMeter";
import ErrorBanner from "./ErrorBanner";

export default function ResetPassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true)
    try {
      await Api.post("/auth/reset-password", {
        email: localStorage.getItem("email"),
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Reset failed");
    } finally {
      setLoading(false)
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Secure your account."
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Update Password</h2>

        <ErrorBanner message={error} />

        <PasswordInput
          name="oldPassword"
          value={form.oldPassword}
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
          placeholder="Old Password"
        />

        <PasswordInput
          name="newPassword"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
          placeholder="New Password"
        />

        <StrengthMeter password={form.newPassword} />

        <PasswordInput
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          placeholder="Confirm Password"
        />
        <button className="login-btn" disabled={loading}>
          {loading ? "Please wait..." : "Update Password"}
        </button>
      </form>
    </AuthLayout>
  );
}