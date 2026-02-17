import React, { useEffect, useState, useCallback } from "react";
import Api from "../../api/Api";
import { API_ENDPOINTS } from "../../api/apiConfig";
import {
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import "../../CSS/HighInterestRooms.css";
import MyLoader from "../../components/MyLoader";

const HighInterestRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(false);

  const adminEmail = localStorage.getItem("email");

  const fetchHighInterestRooms = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await Api.get(
        API_ENDPOINTS.ADMIN_HIGH_INTEREST
      );
      setRooms(res.data || []);
    } catch (err) {
      console.error(
        "Error fetching high interest rooms",
        err
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHighInterestRooms();
  }, [fetchHighInterestRooms]);

  const handleMarkAsBooked = async (roomId) => {
    if (
      !window.confirm(
        "Have you confirmed with the owner that this room is booked?"
      )
    )
      return;

    try {
      setActionLoadingId(roomId);

      await Api.patch(
        `${API_ENDPOINTS.ADMIN_MARK_BOOKED(
          roomId
        )}?adminEmail=${adminEmail}`
      );

      // Optimistic update (remove room instantly)
      setRooms((prev) =>
        prev.filter((room) => room.id !== roomId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update booking status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading)
    return (
      <MyLoader data="Loading high interest rooms..." />
    );

  if (error)
    return (
      <div className="error-box">
        Failed to load data.
        <button
          className="btn btn-outline btn-sm"
          onClick={fetchHighInterestRooms}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="admin-container">
      <div className="admin-header-box">
        <h2>
          <AlertTriangle className="danger-icon" />
          High Interest Listings
        </h2>
        <p>
          These rooms have been contacted by 5+ users.
          Review and update status if booked.
        </p>
      </div>

      {rooms.length === 0 ? (
        <div className="no-data">
          No flagged rooms at the moment.
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Room Details</th>
              <th>Interest Level</th>
              <th>Owner Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="flagged-row">
                <td>
                  <div className="room-cell">
                    <strong>{room.title}</strong>
                    <span>
                      {room.city}, {room.pincode}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="view-count-badge">
                    {room.contactViewCount} Premium
                    Views
                  </div>
                </td>

                <td>
                  <div className="contact-info">
                    <p>
                      <Mail size={14} />
                      {room.ownerEmail}
                    </p>
                    <p>
                      <Phone size={14} />
                      {room.contactNumber}
                    </p>
                  </div>
                </td>

                <td>
                  <button
                    className="btn btn-success btn-sm"
                    disabled={
                      actionLoadingId === room.id
                    }
                    onClick={() =>
                      handleMarkAsBooked(room.id)
                    }
                  >
                    <CheckCircle size={16} />
                    {actionLoadingId === room.id
                      ? "Updating..."
                      : "Mark as Booked"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HighInterestRooms;
