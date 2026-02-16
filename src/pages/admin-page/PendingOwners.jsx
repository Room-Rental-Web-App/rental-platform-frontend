import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { Check, X, ExternalLink, Loader2, Clock, Flag } from "lucide-react";
import "../../CSS/PendingOwners.css";
import MyLoader from "../../components/MyLoader";

const PendingOwners = () => {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingOwners();
  }, []);

  const fetchPendingOwners = async () => {
    try {
      setLoading(true);
      // Use getAuthHeaders() just like in AllUsers
      const response = await axios.get(API_ENDPOINTS.ADMIN_PENDING_OWNERS, {
        headers: getAuthHeaders(),
      });
      setPendingList(response.data);
    } catch (error) {
      console.error("Error fetching pending owners:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this owner?`
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
      fetchPendingOwners();
    } catch (error) {
       console.log(error)
      alert("Failed to update status.");
    }
  };

  if (loading) return <MyLoader data={"Loading Owners for Approvel... Please wait..."} />
  return (
    <div className="admin-layout">
      {" "}
      {/* IMPORTANT: Layout Wrapper */}
      <div className="admin-main-content">
        {" "}
        {/* IMPORTANT: Main Content Wrapper */}
        <div className="page-header">
          <h2>
            <Clock size={24} /> Pending Owner Approvals
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

                      >
                        <ExternalLink size={16} /> View Aadhaar
                      </a>
                    </td>
                    <td className="action-buttons">
                      <button
                        className="btn-approve"
                        onClick={() => updateStatus(user.id, "approve")}

                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => updateStatus(user.id, "reject")}

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

export default PendingOwners;
