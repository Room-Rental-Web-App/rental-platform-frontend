import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  Edit,
  Trash2,
  X,
  MapPin,
  IndianRupee,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  RotateCcw,
  BookCheck,
} from "lucide-react";
import "../../CSS/MyListings.css";

const MyListings = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.MY_LISTINGS, {
        params: { email: localStorage.getItem("email") },
        headers: getAuthHeaders(),
      });
      setRooms(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleToggleStatus = async (room) => {
    const currentStatus = room.isAvailable ?? true;
    const newStatus = !currentStatus;

    const confirmMsg = newStatus
      ? "Are you sure you want to RE-LIST this property? It will be visible in search results again."
      : "Are you sure you want to mark this property as BOOKED? It will be hidden from search results.";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.put(
        API_ENDPOINTS.UPDATE_ROOM(room.id),
        { ...room, isAvailable: newStatus },
        {
          params: { email: localStorage.getItem("email") },
          headers: getAuthHeaders(),
        },
      );
      setRooms(rooms.map((r) => (r.id === room.id ? res.data : r)));
      alert(
        newStatus
          ? "Property is now LIVE! ✅"
          : "Property successfully marked as BOOKED! 🏠",
      );
    } catch (err) {
      alert("Failed to update property status. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to PERMANENTLY delete this listing? This action cannot be undone.",
      )
    )
      return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_ROOM(id), {
        params: { email: localStorage.getItem("email") },
        headers: getAuthHeaders(),
      });
      setRooms(rooms.filter((r) => r.id !== id));
      alert("Listing deleted successfully.");
    } catch (err) {
      alert("Deletion failed. Please contact support if the issue persists.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        API_ENDPOINTS.UPDATE_ROOM(editingRoom.id),
        editingRoom,
        {
          params: { email: localStorage.getItem("email") },
          headers: getAuthHeaders(),
        },
      );
      setRooms(rooms.map((r) => (r.id === editingRoom.id ? res.data : r)));
      setIsModalOpen(false);
      alert("Property details updated successfully!");
    } catch (err) {
      alert("Update failed. Please check the input data.");
    }
  };

  return (
    <div className="my-listings-container">
      <div className="my-listings-header">
        <h2>Your Properties</h2>
      </div>

      <div className="listings-grid">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`listing-card ${(room.isAvailable ?? true) === false ? "booked-opacity" : ""}`}
          >
            {/* Status Badges Overlay */}
            <div className="badge-container">
              {!(room.isApprovedByAdmin ?? false) ? (
                <span className="badge pending">
                  <Clock size={12} /> Under Review
                </span>
              ) : (room.isAvailable ?? true) ? (
                <span className="badge available">
                  <CheckCircle size={12} /> Live & Available
                </span>
              ) : (
                <span className="badge booked">
                  <AlertCircle size={12} /> Occupied / Booked
                </span>
              )}
            </div>

            <img
              src={room.imageUrls?.[0] || "https://placehold.co/300x200"}
              alt="Property"
            />

            <div className="card-info">
              <h3>{room.title}</h3>

              <div className="price-location">
                <p>
                  <IndianRupee size={14} /> <strong>{room.price}</strong>/month
                </p>
                <p>
                  <MapPin size={14} /> {room.city}
                </p>
              </div>

              {/* Interest Metrics */}
              <div className="interest-bar">
                <Users size={14} />
                <span>{room.contactViewCount ?? 0} Inquiries received</span>
              </div>

              <div className="actions">
                <button
                  onClick={() => {
                    setEditingRoom(room);
                    setIsModalOpen(true);
                  }}
                  className="edit-btn"
                  disabled={!(room.isAvailable ?? true)}
                  title={
                    !(room.isAvailable ?? true)
                      ? "Re-list the property to edit details"
                      : "Edit Property"
                  }
                >
                  <Edit size={16} /> Edit
                </button>

                {/* Status Toggle Button */}
                <button
                  onClick={() => handleToggleStatus(room)}
                  className={
                    (room.isAvailable ?? true)
                      ? "status-btn-mark-booked"
                      : "status-btn-mark-available"
                  }
                >
                  {(room.isAvailable ?? true) ? (
                    <>
                      <BookCheck size={16} /> Mark Booked
                    </>
                  ) : (
                    <>
                      <RotateCcw size={16} /> Re-list
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(room.id)}
                  className="delete-btn"
                  title="Delete Listing"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Update Property Details</h3>
              <X
                onClick={() => setIsModalOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Property Title</label>
                <input
                  value={editingRoom.title}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Monthly Rent (₹)</label>
                <input
                  type="number"
                  value={editingRoom.price}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editingRoom.description}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <button type="submit" className="save-btn">
                Confirm Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
