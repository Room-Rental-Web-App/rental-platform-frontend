import React, { useEffect, useState } from 'react'
import Api from '../../api/Api'
import AdminSidebar from './AdminSidebar'
import { Clock, ExternalLink, Check, X, Loader2 } from 'lucide-react'
import { API_ENDPOINTS, getAuthHeaders } from '../../api/apiConfig';
import axios from 'axios';
function PendingUsers() {
    const [pendingList, setPendingList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        Api.get('/admin/pending-users').then((response) => {
            setPendingList(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching pending users:", error);
            setLoading(false);
        });
    };

const updateStatus = async (id, action) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this user?`
    );
    if (!confirmAction) return;

    try {
      const url =
        action === "approve"
          ? API_ENDPOINTS.APPROVE_OWNER(id)
          : API_ENDPOINTS.REJECT_OWNER(id);

      await axios.put(
        url,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      alert(`Owner ${action}ed successfully!`);
      fetchPendingUsers();
    } catch (error) {
      alert("Failed to update status.");
    }
  };



    return (
        <div className="admin-layout">
            {" "}
            <div className="admin-main-content">
                {" "}
                {/* IMPORTANT: Main Content Wrapper */}
                <div className="page-header">
                    <h2>
                        <Clock size={24} /> Pending Users Approvals
                    </h2>
                    <p>Review Aadhaar details before approving access.</p>
                </div>
                {loading ? (
                    <div className="admin-loader">
                        <Loader2 className="animate-spin" /> Loading Requests...
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>ID Proof</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingList.length > 0 ? (
                                pendingList.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.phone || "N/A"}</td>
                                        <td>
                                            <a
                                                href={user.aadharUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-id-link"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                    color: "#4f46e5",
                                                }}
                                            >
                                                <ExternalLink size={16} /> View Aadhaar
                                            </a>
                                        </td>
                                        <td className="action-buttons">
                                            <button
                                                className="btn-approve"
                                                onClick={() => updateStatus(user.id, "approve")}
                                                style={{
                                                    marginRight: "10px",
                                                    color: "green",
                                                    border: "1px solid green",
                                                    padding: "5px 10px",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                className="btn-reject"
                                                onClick={() => updateStatus(user.id, "reject")}
                                                style={{
                                                    color: "red",
                                                    border: "1px solid red",
                                                    padding: "5px 10px",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="no-data"
                                        style={{ textAlign: "center", padding: "20px" }}
                                    >
                                        No pending requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PendingUsers;
