import React, { useEffect, useState, useCallback } from "react";
import Api from "../../api/Api";
import { Search } from "lucide-react";
import AadhaarModal from "../../models/AadhaarModal";
import "../../css/adminUsers.css";
import MyLoader from "../../components/MyLoader";
import UserCard from "../../components/UserCard";

const AdminUsers = ({ role, endPoint }) => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [aadhaarUrl, setAadhaarUrl] = useState(null);

  // Clean display role
  const displayRole = role
    ?.replace(/^ROLE_/, "")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  // Memoized fetch function
  const fetchUsers = useCallback(async () => {
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
  }, [role, email, endPoint]);

  // Debounced fetch
  useEffect(() => {
    const timer = setTimeout(fetchUsers, 400);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  return (
    <div className="admin-users">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h2>
            {displayRole || "All"} Users
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
        <MyLoader data={`Loading ${displayRole || "Users"}...`} />
      ) : (
        <UserCard users={users} setAadhaarUrl={setAadhaarUrl} fetchUsers={fetchUsers} />
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
