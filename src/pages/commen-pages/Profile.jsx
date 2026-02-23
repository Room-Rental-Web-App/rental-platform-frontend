import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Profile.css";
import Api from "../../api/Api";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Lock,
  RefreshCw,
  LogOut,
  Save,
  ShieldCheck,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    userId: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUser({
      fullName: localStorage.getItem("fullName") || "Guest User",
      email:    localStorage.getItem("email")    || "notadded@rooksdekho.com",
      phone:    localStorage.getItem("phone")    || "Not Added",
      role:     localStorage.getItem("role")     || "User",
      userId:   localStorage.getItem("userId")   || "N/A",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Api.patch("/users/profile", {
        id:       localStorage.getItem("userId"),
        fullName: user.fullName,
        phone:    user.phone,
      });
      localStorage.setItem("fullName", user.fullName);
      localStorage.setItem("phone",    user.phone);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const roleLabel = {
    ROLE_ADMIN: "Admin",
    ROLE_OWNER: "Owner",
    ROLE_USER:  "User",
  }[user.role] ?? user.role;

  return (
    <div className="profile-wrapper">
      {/* ── PAGE HEADER ── */}
      <div className="profile-header-main">
        <h1>Account Settings</h1>
        <p>Manage your personal information and security</p>
      </div>

      <div className="profile-grid">

        {/* ══════════════════════════
            SIDEBAR
        ══════════════════════════ */}
        <div className="profile-sidebar-card">
          <div className="avatar-container">
            <div className="avatar-ui">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <span className="role-tag">{roleLabel}</span>
          </div>

          <div className="sidebar-info">
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
          </div>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* ══════════════════════════
            DETAILS AREA
        ══════════════════════════ */}
        <div className="profile-details-area">

          {/* Personal Details Card */}
          <div className="details-card">
            <div className="card-top">
              <h3>Personal Details</h3>
              <button
                className="edit-toggle-btn"
                onClick={() => setEditMode((v) => !v)}
              >
                {editMode ? "Cancel" : <><Edit3 size={14} /> Edit</>}
              </button>
            </div>

            <div className="info-fields">
              {/* Full Name */}
              <div className="field-group">
                <label><User size={14} /> Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                ) : (
                  <p>{user.fullName}</p>
                )}
              </div>

              {/* Email — always read-only */}
              <div className="field-group">
                <label><Mail size={14} /> Email Address</label>
                <p className="readonly-text">{user.email}</p>
              </div>

              {/* Phone */}
              <div className="field-group">
                <label><Phone size={14} /> Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>

              {editMode && (
                <button
                  className="main-save-btn"
                  onClick={handleSave}
                  disabled={saving}
                >
                  <Save size={15} />
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              )}
            </div>
          </div>

          {/* Security Card */}
          <div className="details-card security-card">
            <h3>
              <ShieldCheck
                size={16}
                style={{
                  display: "inline",
                  marginRight: 7,
                  color: "var(--primary)",
                  verticalAlign: "middle",
                }}
              />
              Security &amp; Account
            </h3>
            <div className="action-row">
              <button
                className="sec-action-btn"
                onClick={() => navigate("/reset-password")}
              >
                <Lock size={15} /> Change Password
              </button>
              <button
                className="sec-action-btn"
                onClick={() => navigate("/forgot-password")}
              >
                <RefreshCw size={15} /> Forgot Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;