import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/apiConfig";
import Api from "../../api/Api";

import { Mail } from "lucide-react";

import AuthLayout from "./AuthLayout";
import PasswordInput from "./PasswordInput"
import ErrorBanner from "./ErrorBanner";import InputWithIcon from "./InputWithIcon";
;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    navigate("/");
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        API_ENDPOINTS.LOGIN_REQUEST,
        form
      );
      handleSuccessfulLogin(response.data);
    } catch (err) {
      const message = err.response?.data || "Login failed.";
      setError(message);

      if (
        message ===
        "Account not verified. Please verify OTP first."
      ) {
        const confirmOtp = window.confirm(
          "Account not verified. Send OTP now?"
        );

        if (confirmOtp) {
          try {
            await Api.post(`/auth/send-otp/${form.email}`);
            navigate("/verify-otp", {
              state: { email: form.email },
            });
          } catch {
            setError("Failed to send OTP.");
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to access your account."
    >
      <form className="login-form" onSubmit={login}>
        <h2>Welcome Back</h2>

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
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Sign up
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