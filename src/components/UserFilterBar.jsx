import React from "react";
import "../css/userFilterBar.css";

const UserFilterBar = ({ filters, setFilters }) => {
  return (
    <div className="user-filters">
      <input
        type="text"
        placeholder="Search by email, phone, name"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>

      <select
        value={filters.verified}
        onChange={(e) =>
          setFilters({ ...filters, verified: e.target.value })
        }
      >
        <option value="">All Users</option>
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>

      <select
        value={filters.enabled}
        onChange={(e) =>
          setFilters({ ...filters, enabled: e.target.value })
        }
      >
        <option value="">All Accounts</option>
        <option value="true">Enabled</option>
        <option value="false">Disabled</option>
      </select>

      <select
        value={filters.role}
        onChange={(e) =>
          setFilters({ ...filters, role: e.target.value })
        }
      >
        <option value="">All Roles</option>
        <option value="ROLE_USER">User</option>
        <option value="ROLE_OWNER">Owner</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>
    </div>
  );
};

export default UserFilterBar;
