import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Profile.css";

import {
  User,
  Mail,
  Phone,
  Edit3,
  Lock,
  RefreshCw,
  Bookmark,
  Calendar,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  // Basic User State
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  // UI States (Inhe add karna zaroori tha)
  const [editMode, setEditMode] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showResetSection, setShowResetSection] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("name") || "Guest User",
      email: localStorage.getItem("email") || "notadded@roomsdekho.com",
      phone: localStorage.getItem("phone") || "Not Added",
      role: localStorage.getItem("role") || "User",
    };
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("name", user.name);
    localStorage.setItem("phone", user.phone);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setShowPasswordSection(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header-main">
        <h1>Account Settings</h1>
        <p>Manage your personal information and security</p>
      </div>

      <div className="profile-grid">
        {/* Left Side: Sidebar Card */}
        <div className="profile-sidebar-card">
          <div className="avatar-container">
            <div className="avatar-ui">{user.name.charAt(0).toUpperCase()}</div>
            <span className="role-tag">{user.role}</span>
          </div>
          <div className="sidebar-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <div className="profile-stats">
            <div className="stat-box">
              <Bookmark size={18} />
              <span>12 Saved</span>
            </div>
            <div className="stat-box">
              <Calendar size={18} />
              <span>3 Bookings</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Right Side: Details Area */}
        <div className="profile-details-area">
          <div className="details-card">
            <div className="card-top">
              <h3>Personal Details</h3>
              <button
                className="edit-toggle-btn"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? (
                  "Cancel"
                ) : (
                  <>
                    <Edit3 size={16} /> Edit
                  </>
                )}
              </button>
            </div>

            <div className="info-fields">
              <div className="field-group">
                <label>
                  <User size={16} /> Full Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>

              <div className="field-group">
                <label>
                  <Mail size={16} /> Email Address
                </label>
                <p className="readonly-text">{user.email}</p>
              </div>

              <div className="field-group">
                <label>
                  <Phone size={16} /> Phone Number
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>

              {editMode && (
                <button className="main-save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="details-card security-card">
            <h3>Security & Account</h3>
            <div className="action-row">
              <button
                className="sec-action-btn"
                onClick={() => {
                  setShowPasswordSection(!showPasswordSection);
                  setShowResetSection(false);
                }}
              >
                <Lock size={16} /> Change Password
              </button>
              <button
                className="sec-action-btn"
                onClick={() => {
                  setShowResetSection(!showResetSection);
                  setShowPasswordSection(false);
                }}
              >
                <RefreshCw size={16} /> Reset Password
              </button>
            </div>

            {showPasswordSection && (
              <div className="expandable-form">
                <input
                  type="password"
                  placeholder="Old Password"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  className="main-save-btn"
                  onClick={handlePasswordSubmit}
                >
                  Update Password
                </button>
              </div>
            )}

            {showResetSection && (
              <div className="expandable-form">
                <input
                  type="email"
                  placeholder="Enter Registered Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <button
                  className="main-save-btn"
                  onClick={() => alert("Link Sent!")}
                >
                  Send Reset Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
