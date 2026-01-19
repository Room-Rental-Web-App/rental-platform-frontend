import React, { useEffect, useState } from "react";
import "../../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("name") || "Not Added",
      email: localStorage.getItem("email") || "Not Added",
      phone: localStorage.getItem("phone") || "Not Added",
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
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
