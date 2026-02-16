import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import { Loader2, Search } from "lucide-react";
import AadhaarModal from "../../models/AadhaarModal ";
import "../../css/adminUsers.css";
import MyLoader from "../../components/MyLoader";

const AdminUsers = ({ role, endPoint }) => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const displayRole = role
    ?.replace(/^ROLE_/, "")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());


  const [aadhaarUrl, setAadhaarUrl] = useState(null);

  // Fetch users with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(timer);
  }, [email, role]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await Api.get(`/admin/${endPoint}`, {
        params: { role, email },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-users">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h2>
            {role ? role.replace("ROLE_", "") : "All"} Users
            <span className="header-count">{users.length}</span>
          </h2>
          <p className="page-subtitle">
            Manage users, verification status, and identity documents
          </p>
        </div>
      </div>




      {/* Search */}
      <div className="admin-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Loader */}
      {loading ? (
        <>
          <MyLoader data={`Loading ${displayRole}'s`} />
        </>
      ) : (
        <div className="users-list">
          {users.length ? (
            users.map((u) => (
              <div className="user-card" key={u.id}>
                {/* Header */}
                <div className="user-card-header">
                  <div className="user-avatar">
                    {u.email?.charAt(0).toUpperCase()}
                  </div>

                  <div className="user-main">
                    <h4>{u.fullName || "Unnamed User"}</h4>
                    <p className="email">{u.email}</p>
                  </div>

                  <span className={`badge ${u.role}`}>
                    {u.role.replace("ROLE_", "")}
                  </span>
                </div>

                {/* Body */}
                <div className="user-card-body">
                  <div className="info">
                    <span>Phone</span>
                    <p>{u.phone || "N/A"}</p>
                  </div>

                  <div className="info">
                    <span>Status</span>
                    <p className={`status ${u.status?.toLowerCase()}`}>
                      {u.status}
                    </p>
                  </div>

                  <div className="info">
                    <span>Enabled</span>
                    <p>{u.enabled ? "Yes" : "No"}</p>
                  </div>

                  <div className="info">
                    <span>Verified</span>
                    <p>{u.verifiedUser ? "Yes" : "No"}</p>
                  </div>
                </div>

                {/* Aadhaar */}
                <div className="user-card-footer">
                  <span>Aadhaar Card</span>

                  {u.aadharUrl ? (
                    <img
                      src={u.aadharUrl}
                      alt="Aadhaar"
                      className="aadhar-preview clickable"
                      onClick={() => setAadhaarUrl(u.aadharUrl)}
                    />
                  ) : (
                    <p className="muted">Not Uploaded</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No users found.</div>
          )}
        </div>
      )}

      {/* Aadhaar Modal */}
      {aadhaarUrl && (
        <AadhaarModal
          url={aadhaarUrl}
          onClose={() => setAadhaarUrl(null)}
        />
      )}
    </div>
  );
};

export default AdminUsers;
