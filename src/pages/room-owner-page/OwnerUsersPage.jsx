import { useEffect, useState } from "react";
import CreateReport from "../../components/CreateReport";
import "../../css/ownerUsersPage.css";
import Api from "../../api/Api";
import {
  Search,
  X,
  Loader,
  Users,
  Phone,
  Mail,
  AlertCircle,
  UserX,
  RefreshCw,
} from "lucide-react";

export default function OwnerUsersPage() {
  const [users, setUsers] = useState([]);
  const [reportUserId, setReportUserId] = useState(null);
  const [emailFilter, setEmailFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = {
    id: Number(localStorage.getItem("userId")),
    email: localStorage.getItem("email"),
  };

  // fetch users ONLY when explicitly called
  const fetchUsers = (email = "") => {
    setLoading(true);
    setError("");

    Api.get("/users/allUsers", {
      params: { email: email || undefined, role: "ROLE_USER" },
    })
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  // initial load (no filter)
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = () => {
    if (emailFilter.trim()) {
      fetchUsers(emailFilter.trim());
    }
  };

  const handleClear = () => {
    setEmailFilter("");
    fetchUsers();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  // Filter out current user from display
  const filteredUsers = users.filter((user) => user.id !== currentUser.id);

  return (
    <div className="owner-users-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <Users size={32} className="header-icon" />
          <div>
            <h2>Users Directory</h2>
            <p className="header-subtitle">
              Manage and view all registered users
            </p>
          </div>
        </div>
        {!loading && filteredUsers.length > 0 && (
          <div className="user-count-badge">
            <Users size={16} />
            <span>{filteredUsers.length} Users</span>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="filter-section">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search users by email address..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            onKeyPress={handleKeyPress}
            className="email-filter"
          />
          {emailFilter && (
            <button
              className="clear-input-btn"
              onClick={() => setEmailFilter("")}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="filter-actions">
          <button
            className="filter-btn"
            onClick={handleFilter}
            disabled={loading || !emailFilter.trim()}
          >
            <Search size={16} />
            Search
          </button>
          <button
            className="clear-btn"
            onClick={handleClear}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <Loader className="spinner" size={40} />
          <p className="loading-text">Loading users...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="error-container">
          <AlertCircle size={48} className="error-icon" />
          <h3>Oops! Something went wrong</h3>
          <p className="error-text">{error}</p>
          <button className="retry-btn" onClick={() => fetchUsers()}>
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      )}

      {/* Empty State - No Users Found */}
      {!loading && !error && filteredUsers.length === 0 && (
        <div className="empty-container">
          <UserX size={64} className="empty-icon" />
          <h3>No Users Found</h3>
          <p className="empty-text">
            {emailFilter
              ? `No users found matching "${emailFilter}"`
              : "No registered users in the system yet"}
          </p>
          {emailFilter && (
            <button className="clear-filter-btn" onClick={handleClear}>
              <X size={16} />
              Clear Filter
            </button>
          )}
        </div>
      )}

      {/* Users Grid */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-card ${reportUserId === user.id ? "report-active" : ""}`}
            >
              {/* User Avatar */}
              <div className="user-avatar">
                <Users size={24} />
              </div>

              {/* User Info */}
              <div className="user-info">
                <div className="user-email">
                  <Mail size={16} className="info-icon" />
                  <strong>{user.email}</strong>
                </div>
                <div className="user-phone">
                  <Phone size={16} className="info-icon" />
                  <span>{user.phone || "Not provided"}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="user-actions">
                {reportUserId !== user.id ? (
                  <button
                    className="report-btn"
                    onClick={() => setReportUserId(user.id)}
                  >
                    <AlertCircle size={16} />
                    Report User
                  </button>
                ) : (
                  <div className="report-section">
                    <CreateReport
                      reporterId={currentUser.id}
                      reportType="USER"
                      targetId={user.id}
                    />
                    <button
                      className="cancel-btn"
                      onClick={() => setReportUserId(null)}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
