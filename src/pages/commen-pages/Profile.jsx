import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import Api from "../../api/Api";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showResetSection, setShowResetSection] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("name") || "Not Added",
      email: localStorage.getItem("email") || "Not Added",
      phone: localStorage.getItem("phone") || "Not Added",
      role: localStorage.getItem("role") || "Not Added",
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

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // REAL APP: CALL PASSWORD CHANGE API HERE
    alert("Password changed successfully!");

    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordSection(false);
  };

  const handleResetPassword = () => {
    if (!resetEmail) {
      alert("Please enter email to reset password");
      return;
    }

    // REAL APP: CALL RESET PASSWORD API HERE
    alert("Password reset link sent to: " + resetEmail);

    setResetEmail("");
    setShowResetSection(false);
  };

  return (
    <div className="profile-container">
      <h2>My Profile - RoomsDekho</h2>

      <div className="profile-card">
        <div className="profile-row">
          <label>Name:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        <div className="profile-row">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>

        <div className="profile-row">
          <label>Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          ) : (
            <span>{user.phone}</span>
          )}
        </div>

        <div className="profile-row">
          <label>Role:</label>
          <span>{user.role}</span>
        </div>

        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="extra-section">
        <h3>Account Actions</h3>

        {/* CHANGE PASSWORD */}
        <button
          className="action-btn"
          onClick={() => {
            setShowPasswordSection(!showPasswordSection);
            setShowResetSection(false);
          }}
        >
          Change Password
        </button>

        {showPasswordSection && (
          <div className="password-section">
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />

            <button
              className="save-btn"
              onClick={handlePasswordSubmit}
            >
              Update Password
            </button>
          </div>
        )}

        {/* RESET PASSWORD */}
        <button
          className="action-btn"
          onClick={() => {
            setShowResetSection(!showResetSection);
            setShowPasswordSection(false);
          }}
        >
          Reset Password (Forgot)
        </button>

        {showResetSection && (
          <div className="password-section">
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            <button
              className="save-btn"
              onClick={handleResetPassword}
            >
              Send Reset Link
            </button>
          </div>
        )}

        <button className="action-btn">My Bookings</button>
        <button className="action-btn">Saved Rooms</button>
      </div>
    </div>
  );
};

export default Profile;
