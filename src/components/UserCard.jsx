import React from "react";
import "../CSS/userCard.css";
import Api from "../api/Api";


function UserCard({ users, setAadhaarUrl, fetchUsers }) {
  console.log(users)

  function onApproveOrReject(userId, status) {
    Api.put(`/admin/user-status/${userId}`, null, {
      params: { status: status }
    })
      .then(res => alert(res.data))
      .catch(err => console.log(err))
      .finally(() => fetchUsers()); 

  }

  const handleToggleBlock = async (id, enabled) => {
    Api.put(`/admin/block/${id}`, null, {
      params: {
        enabled: !enabled,
      },
    })
      .then(res => alert(res.data))
      .catch(err => console.log(err))
      .finally(() => fetchUsers());
  };

  return (
    <div className="uc-list">
      {users.length ? (
        users.map((u) => (
          <div className="uc-card" key={u.id}>
            {/* HEADER */}
            <div className="uc-header">
              <div className="uc-avatar">
                {u.email?.charAt(0).toUpperCase()}
              </div>

              <div className="uc-main">
                <h4>{u.fullName || "Unnamed User"}</h4>
                <p className="uc-email">{u.email}</p>
              </div>

              <span className="uc-role">
                {u.role?.replace("ROLE_", "")}
              </span>
            </div>

            {/* BODY */}
            <div className="uc-body">
              <div className="uc-info">
                <span>Phone</span>
                <p>{u.phone || "N/A"}</p>
              </div>

              <div className="uc-info">
                <span>Status</span>
                <p
                  className={`uc-status uc-status-${u.status?.toLowerCase()}`}
                >
                  {u.status}
                </p>
              </div>

              <div className="uc-info">
                <span>Enabled</span>
                <p>{u.enabled ? "Yes" : "No"}</p>
              </div>

              <div className="uc-info">
                <span>Verified</span>
                <p>{u.isVerifiedUser ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="uc-footer">
              <div>
                <span className="uc-footer-label">Aadhaar</span>
                {u.aadharUrl ? (
                  <img
                    src={u.aadharUrl}
                    alt="Aadhaar"
                    className="uc-aadhar-preview"
                    onClick={() => setAadhaarUrl(u.aadharUrl)}
                  />
                ) : (
                  <p className="uc-muted">Not Uploaded</p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="uc-actions">
                {u.status === "PENDING" && (
                  <div className="uc-moderation-actions">
                    <button
                      className="uc-btn uc-btn-success"
                      onClick={() => onApproveOrReject(u.id, "APPROVED")}
                    >
                      Approve
                    </button>

                    <button
                      className="uc-btn uc-btn-warning"
                      onClick={() => onApproveOrReject(u.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </div>
                )}

                <button
                  className={`uc-btn ${u.enabled
                    ? "uc-btn-danger"
                    : "uc-btn-secondary"
                    }`}
                  onClick={() =>
                    handleToggleBlock(u.id, u.enabled)
                  }
                >
                  {u.enabled ? "Block" : "Unblock"}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="uc-no-data">No users found.</div>
      )}
    </div>
  );
}

export default UserCard;