import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/apiConfig.js";
import "../../css/Login.css";
import { Lock, Mail, ShieldCheck, ArrowRight, UserCircle } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    role: "ROLE_USER", // Default role set ki hai
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Backend ko email, password aur role teeno bhej rahe hain
      await axios.post(API_ENDPOINTS.REGISTER_REQUEST, {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.VERIFY_OTP, {
        email: formData.email,
        otp: formData.otp,
      });
      alert("Registration Successful! Now you can Login.");
      navigate("/login");
    } catch (err) {
      setError("Invalid or Expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={step === 1 ? handleRegisterSubmit : handleOtpVerify}
      >
        <h2>{step === 1 ? "Create Account" : "Verify Email"}</h2>
        {error && (
          <p className="error-msg" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {step === 1 ? (
          <>
            <div className="input-group">
              <Mail size={20} />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <Lock size={20} />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {/* Role Selection Dropdown */}
            <div className="input-group">
              <UserCircle size={20} />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="role-select"
              >
                <option value="ROLE_USER">I am a Tenant (User)</option>
                <option value="ROLE_OWNER">I am a Room Owner</option>
              </select>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Sending OTP..." : "Get OTP"} <ArrowRight size={18} />
            </button>
            <p className="toggle-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </>
        ) : (
          <>
            <p className="info-msg">OTP sent to {formData.email}</p>
            <div className="input-group">
              <ShieldCheck size={20} />
              <input
                type="text"
                placeholder="Enter 6-Digit OTP"
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                required
                maxLength="6"
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
