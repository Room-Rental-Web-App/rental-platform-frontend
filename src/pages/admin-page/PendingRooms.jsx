import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";

import { Check, X, Eye, IndianRupee, MapPin, Loader2 } from "lucide-react";

import "../../CSS/PendingRooms.css";
import MyLoader from "../../components/MyLoader";

const PendingRooms = () => {
  const [pendingRooms, setPendingRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRooms();
  }, []);

  const fetchPendingRooms = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.ADMIN_PENDING_ROOMS, {
        headers: getAuthHeaders(),
      });
      setPendingRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, action) => {
    const confirmMessage = `Are you sure you want to ${
      action === "approve" ? "Approve" : "Reject"
    } this listing?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      const endpoint =
        action === "approve"
          ? API_ENDPOINTS.APPROVE_ROOM(id)
          : API_ENDPOINTS.REJECT_ROOM(id);

      await axios.put(endpoint, {}, { headers: getAuthHeaders() });
      alert(`Room ${action}ed successfully!`);
      fetchPendingRooms(); // Refresh the list
    } catch (err) {
      console.log(err);
      alert("Action failed. Please try again.");
    }
  };

  if (loading) return <MyLoader data={"Loading Rooms for Approvel... Please wait..."} />

  return (
    <div className="admin-layout">
      <div className="admin-main-content">
        <div className="page-header">
          <h2>Pending Room Approvals</h2>
          <p>Review property details and images before making them live.</p>
        </div>

        {loading ? (
          <div className="admin-loader">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Title & Price</th>
                <th>Location</th>
                <th>Owner Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRooms.length > 0 ? (
                pendingRooms.map((room) => (
                  <tr key={room.id}>
                    <td>
                      <div className="room-thumbnail-group">
                        {room.imageUrls && room.imageUrls.length > 0 ? (
                          <img
                            src={room.imageUrls[0]}
                            alt="Room"
                            className="admin-room-thumb"
                          />
                        ) : (
                          <div className="no-img">No Image</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="room-info">
                        <strong>{room.title}</strong>
                        <span className="price-tag">
                          <IndianRupee size={12} />
                          {room.price}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="loc-info">
                        <MapPin size={14} /> {room.city}, {room.pincode}
                      </div>
                    </td>
                    <td>{room.ownerEmail}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => handleApproval(room.id, "approve")}
                        className="btn-approve"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleApproval(room.id, "reject")}
                        className="btn-reject"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No pending room requests found.
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

export default PendingRooms;
