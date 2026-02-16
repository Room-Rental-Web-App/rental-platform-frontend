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
  Home,
  Loader,
} from "lucide-react";
import "../../CSS/MyListings.css";
import MyLoader from "../../components/MyLoader";

const MyListings = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.MY_LISTINGS, {
        params: { email: localStorage.getItem("email") },
        headers: getAuthHeaders(),
      });
      setRooms(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to load listings. Please refresh the page.");
    } finally {
      setIsLoading(false);
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
        API_ENDPOINTS.UPDATE_ROOM_Availability(room.id, newStatus),
        {},
        { headers: getAuthHeaders() },
      );
      setRooms(rooms.map((r) => (r.id === room.id ? res.data : r)));
      alert(
        newStatus
          ? "Property is now LIVE! ✅"
          : "Property successfully marked as BOOKED! 🏠",
      );
    } catch (err) {
      console.error("Toggle Status Error:", err);
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
      console.error("Delete Error:", err);
      alert("Deletion failed. Please contact support if the issue persists.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!editingRoom.title.trim()) {
      alert("Property title cannot be empty!");
      return;
    }

    if (editingRoom.price <= 0) {
      alert("Please enter a valid rent amount!");
      return;
    }

    if (!editingRoom.description.trim()) {
      alert("Property description cannot be empty!");
      return;
    }

    setIsSaving(true);
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
      setEditingRoom(null);
      alert("Property details updated successfully!");
    } catch (err) {
      console.error("Update Error:", err);
      alert("Update failed. Please check the input data and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageError = (roomId) => {
    setImageErrors((prev) => ({ ...prev, [roomId]: true }));
  };

  const closeModal = () => {
    if (isSaving) return; // Don't close if saving
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  // Loading State
  if (isLoading) return <MyLoader data={" Loading your properties... Please wait..."} />

  // Empty State
  if (rooms.length === 0) {
    return (
      <div className="my-listings-container">
        <div className="my-listings-header">
          <h2>Your Properties</h2>
        </div>
        <div className="empty-listings">
          <Home size={80} color="#cbd5e1" strokeWidth={1.5} />
          <h3 style={{ color: "#1e293b", marginTop: "20px" }}>
            No Listings Yet
          </h3>
          <p style={{ color: "#64748b", marginTop: "10px", maxWidth: "400px" }}>
            You haven't created any property listings yet. Start by adding your
            first property to reach potential tenants!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-listings-container">
      <div className="my-listings-header">
        <h2>Your Properties</h2>
        <span style={{ color: "#64748b", fontSize: "14px" }}>
          {rooms.length} {rooms.length === 1 ? "Listing" : "Listings"}
        </span>
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
              src={
                imageErrors[room.id]
                  ? "https://placehold.co/300x200/f1f5f9/64748b?text=No+Image"
                  : room.imageUrls?.[0] ||
                  "https://placehold.co/300x200/f1f5f9/64748b?text=No+Image"
              }
              alt={room.title || "Property"}
              onError={() => handleImageError(room.id)}
            />

            <div className="card-info">
              <h3 title={room.title}>{room.title}</h3>

              <div className="price-location">
                <p>
                  <IndianRupee size={14} /> <strong>₹{room.price}</strong>/month
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
      {isModalOpen && editingRoom && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="modal-header">
              <h3>Update Property Details</h3>
              <X
                onClick={closeModal}
                size={24}
                style={{
                  cursor: isSaving ? "not-allowed" : "pointer",
                  opacity: isSaving ? 0.5 : 1,
                }}
              />
            </div>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>
                  Property Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={editingRoom.title}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, title: e.target.value })
                  }
                  placeholder="e.g., Spacious 2BHK Apartment"
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="form-group">
                <label>
                  Monthly Rent (₹) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="number"
                  value={editingRoom.price}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, price: e.target.value })
                  }
                  placeholder="e.g., 15000"
                  min="1"
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="form-group">
                <label>
                  Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  value={editingRoom.description}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your property, amenities, location benefits, etc."
                  required
                  disabled={isSaving}
                  rows="5"
                />
              </div>

              <button type="submit" className="save-btn" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader className="spinner" size={18} />
                    Saving Changes...
                  </>
                ) : (
                  "Confirm Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
