import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PlusCircle,
  Upload,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Clock,
  Zap,
  CheckCircle,
} from "lucide-react";
import { API_ENDPOINTS, getAuthHeaders } from "../api/apiConfig";
import "../CSS/OwnerCTA.css"; // Assuming you have a CSS file for styling

const OwnerCTA = () => {
  const navigate = useNavigate();

  // States
  const [showModal, setShowModal] = useState(false);
  const [aadharFile, setAadharFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle, success

  // Data from LocalStorage
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  const handleAction = () => {
    // 1. Check if Logged In
    if (!token) {
      navigate("/login");
      return;
    }

    // 2. Check if already Owner or Admin
    if (role === "ROLE_OWNER" || role === "ROLE_ADMIN") {
      navigate("/add-room");
    } else {
      // 3. If ROLE_USER, show Upgrade Modal
      setShowModal(true);
    }
  };

  const handleUpgradeRequest = async (e) => {
    e.preventDefault();
    setError("");

    if (!aadharFile) {
      setError("Please upload your Aadhar Card to proceed.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("aadharCard", aadharFile);
      formData.append("email", userEmail);

      // Using the endpoint we added in apiConfig
      await axios.post(API_ENDPOINTS.UPGRADE_TO_OWNER, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("success");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Request failed. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main CTA Section */}
      <div className="owner-cta-section">
        <div className="owner-cta-content">
          <div className="trust-badge">
            <Zap size={14} fill="currentColor" />
            <span>Direct Calls • No Brokerage</span>
          </div>
          <h2>Got a Property to List?</h2>
          <p>
            Post your room for <b>FREE</b> and reach thousands of verified
            tenants instantly!
          </p>

          <button className="owner-cta-button" onClick={handleAction}>
            <PlusCircle size={20} />
            <span>Add Your Property</span>
          </button>
        </div>
      </div>

      {/* Role Upgrade Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="role-modal">
            <button className="close-x" onClick={() => setShowModal(false)}>
              ×
            </button>

            {status === "idle" ? (
              <form onSubmit={handleUpgradeRequest}>
                <div className="modal-icon-header">
                  <ShieldCheck size={40} color="#ff6b6b" />
                </div>
                <h3>Upgrade to Owner Account</h3>
                <p>
                  To ensure trust, we need your Aadhar Card for verification.
                  Admin approval typically takes 24 hours.
                </p>

                {error && (
                  <div className="modal-error-msg">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="aadhar-upload-area">
                  <label
                    className={`file-drop-zone ${aadharFile ? "has-file" : ""}`}
                  >
                    <Upload size={24} />
                    <span>
                      {aadharFile
                        ? aadharFile.name
                        : "Click to upload Aadhar Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAadharFile(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                <div className="modal-footer-btns">
                  <button
                    type="submit"
                    className="confirm-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="spinner" size={18} />
                    ) : (
                      "Submit for Approval"
                    )}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-success-state">
                <CheckCircle size={60} color="#2ecc71" />
                <h3>Request Sent!</h3>
                <p>
                  Your request is pending with the Admin. Once approved, you'll
                  be able to list your properties.
                </p>
                <button
                  className="confirm-btn"
                  onClick={() => setShowModal(false)}
                >
                  Great, Understood!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerCTA;
