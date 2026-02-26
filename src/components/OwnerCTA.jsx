import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, CheckCircle, Zap, X, Home, LogOut } from "lucide-react";
import "../CSS/OwnerCTA.css";

const OwnerCTA = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "GUEST" or "USER"

  // LocalStorage se status check karo
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleAction = () => {
    // 1. Agar login nahi hai (Guest)
    if (!token) {
      setModalType("GUEST");
      setShowModal(true);
      return;
    }

    // 2. Agar already Owner ya Admin hai
    if (
      role === "ROLE_OWNER" ||
      role === "ROLE_ADMIN" ||
      role === "OWNER" ||
      role === "ADMIN"
    ) {
      navigate("/add-room");
    }
    // 3. Agar User (Tenant) role se login hai
    else {
      setModalType("USER");
      setShowModal(true);
    }
  };

  // Logout aur Redirect ka pakka solution
  const handleLogoutAndRegister = () => {
    localStorage.clear(); // Sab saaf
    sessionStorage.clear(); // Session bhi saaf

    // window.location use karne se poora app refresh hoga aur logout pakka ho jayega
    window.location.href = "/register";
  };

  return (
    <>
      <div className="owner-cta-section">
        <div className="owner-cta-content">
          <div className="trust-badge">
            <Zap size={14} fill="currentColor" />
            <span>Direct Calls • No Brokerage</span>
          </div>
          <h2>Got a Property to List?</h2>
          <p>
            Post your room for <b>FREE</b> and reach thousands of tenants
            instantly!
          </p>
          <button className="owner-cta-button" onClick={handleAction}>
            <PlusCircle size={20} />
            <span>Add Your Property</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="role-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>

            <div className="modal-icon-header">
              {modalType === "GUEST" ? (
                <Home size={40} color="var(--primary)" />
              ) : (
                <LogOut size={40} color="var(--error)" />
              )}
            </div>

            {/* CASE 1: LOGGED OUT USER */}
            {modalType === "GUEST" && (
              <div className="instruction-content">
                <h3>Start Listing Your Property</h3>
                <p>
                  To list a property, you need a verified <b>Owner Account</b>.
                  One email can only be used for one role.
                </p>
                <div className="modal-footer-btns">
                  <button
                    className="confirm-btn"
                    onClick={() => navigate("/register")}
                  >
                    Register as Owner
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login as Owner
                  </button>
                </div>
              </div>
            )}

            {/* CASE 2: LOGGED IN AS TENANT/USER */}
            {modalType === "USER" && (
              <div className="instruction-content">
                <h3>Account Type Required</h3>
                <p>
                  Aap abhi <b>Tenant Account</b> se login hain. Property list
                  karne ke liye aapko alag <b>Owner Account</b> chahiye.
                </p>
                <div className="ins-list">
                  <div className="ins-item">
                    <CheckCircle size={16} color="var(--success)" />
                    <span>
                      Ek Email se ek hi Role (Tenant ya Owner) milta hai.
                    </span>
                  </div>
                  <div className="ins-item">
                    <CheckCircle size={16} color="var(--success)" />
                    <span>
                      Owner banne ke liye naya registration zaroori hai.
                    </span>
                  </div>
                </div>
                <div className="modal-footer-btns">
                  <button
                    className="confirm-btn"
                    onClick={handleLogoutAndRegister}
                  >
                    Logout & Register as Owner
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Stay as Tenant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerCTA;
