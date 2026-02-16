import React, { useState } from "react";
import { Check, X, Eye } from "lucide-react";
import AadhaarModal from "../models/AadhaarModal ";
import "../css/userCard.css";

const UserCard = ({
  user,
  onStatusChange,
  onToggleEnable,
}) => {
  const {
    id,
    fullName,
    email,
    phone,
    role,
    status,
    enabled,
    aadharUrl,
  } = user;

  const [showAadhaar, setShowAadhaar] = useState(false);

  return (
    <>
      <div className="user-card">
        {/* LEFT */}
        <div className="user-left">
          <div className="avatar">
            {(fullName || email).charAt(0).toUpperCase()}
          </div>

          <div className="details">
            <p className="name">{fullName || "No Name"}</p>
            <p className="email">{email}</p>
            <p className="phone">{phone || "N/A"}</p>

            <div className="badges">
              {role && (
                <span className="badge role">
                  {role.replace("ROLE_", "")}
                </span>
              )}

              <span className={`badge status ${status?.toLowerCase()}`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="user-actions">
          {/* Aadhaar */}
          {aadharUrl && (
            <button
              className="view-btn"
              onClick={() => setShowAadhaar(true)}
            >
              <Eye size={14} />
              Aadhaar
            </button>
          )}

          {/* APPROVE / REJECT */}
          {status === "PENDING" && (
            <div className="approval-actions">
              <button
                className="approve-btn"
                onClick={() => onStatusChange(id, "APPROVED")}
              >
                <Check size={14} />
                Approve
              </button>

              <button
                className="reject-btn"
                onClick={() => onStatusChange(id, "REJECTED")}
              >
                <X size={14} />
                Reject
              </button>
            </div>
          )}

          {/* ENABLE / DISABLE (only after approval) */}
          {status === "APPROVED" && (
            <div className="toggle-wrapper">
              <span className="toggle-label">
                {enabled ? "Enabled" : "Disabled"}
              </span>

              <label className="toggle">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() =>
                    onToggleEnable(id, !enabled)
                  }
                />
                <span />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Aadhaar Modal */}
      {showAadhaar && (
        <AadhaarModal
          url={aadharUrl}
          onClose={() => setShowAadhaar(false)}
        />
      )}
    </>
  );
};

export default UserCard;
