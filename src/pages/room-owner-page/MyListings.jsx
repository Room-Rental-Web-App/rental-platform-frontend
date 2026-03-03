import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
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
      toast.error("Failed to load listings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (room) => {
    const currentStatus = room.isAvailable ?? true;
    const newStatus = !currentStatus;
    const confirmMsg = newStatus ? "Re-list this property?" : "Mark as BOOKED?";

    if (!window.confirm(confirmMsg)) return;

    setTogglingId(room.id);
    const statusToast = toast.loading("Updating...");

    try {
      const res = await axios.put(
        API_ENDPOINTS.UPDATE_ROOM_Availability(room.id, newStatus),
        {},
        { headers: getAuthHeaders() },
      );
      setRooms(rooms.map((r) => (r.id === room.id ? res.data : r)));
      toast.success(
        newStatus ? "Listing is Live! ✅" : "Marked as Booked! 🏠",
        { id: statusToast },
      );
    } catch (err) {
      toast.error("Update failed.", { id: statusToast });
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete permanently? This cannot be undone.")) return;

    setDeletingId(id);
    const delToast = toast.loading("Deleting...");

    try {
      await axios.delete(API_ENDPOINTS.DELETE_ROOM(id), {
        params: { email: localStorage.getItem("email") },
        headers: getAuthHeaders(),
      });
      setRooms(rooms.filter((r) => r.id !== id));
      toast.success("Deleted successfully.", { id: delToast });
    } catch (err) {
      toast.error("Deletion failed.", { id: delToast });
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const saveToast = toast.loading("Saving changes...");

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
      toast.success("Updated successfully!", { id: saveToast });
    } catch (err) {
      toast.error("Update failed.", { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageError = (roomId) => {
    setImageErrors((prev) => ({ ...prev, [roomId]: true }));
  };

  if (isLoading) return <MyLoader data={"Loading your properties..."} />;

  return (
    <div className="my-listings-container">
      {/* Dynamic Toaster matching your Orange/Dark Theme */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-primary)",
            borderRadius: "12px",
          },
          success: {
            iconTheme: { primary: "var(--success)", secondary: "#fff" },
          },
          error: { iconTheme: { primary: "var(--error)", secondary: "#fff" } },
          loading: {
            iconTheme: {
              primary: "var(--primary)",
              secondary: "var(--bg-tertiary)",
            },
          },
        }}
      />

      <div className="my-listings-header">
        <h2>Your Properties</h2>
        <span className="listing-count">{rooms.length} Listings</span>
      </div>

      {rooms.length === 0 ? (
        <div className="empty-listings">
          <Home size={80} color="var(--text-tertiary)" strokeWidth={1.5} />
          <h3>No Listings Yet</h3>
          <button
            onClick={() => (window.location.href = "/add-room")}
            className="btn-primary"
          >
            Add New Room
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`listing-card ${(room.isAvailable ?? true) === false ? "booked-opacity" : ""}`}
            >
              <div className="badge-container">
                {!(room.isApprovedByAdmin ?? false) ? (
                  <span className="badge pending">
                    <Clock size={12} /> Review
                  </span>
                ) : (room.isAvailable ?? true) ? (
                  <span className="badge available">
                    <CheckCircle size={12} /> Live
                  </span>
                ) : (
                  <span className="badge booked">
                    <AlertCircle size={12} /> Booked
                  </span>
                )}
              </div>

              <img
                src={
                  imageErrors[room.id]
                    ? "https://placehold.co/300x200?text=No+Image"
                    : room.imageUrls?.[0] ||
                      "https://placehold.co/300x200?text=No+Image"
                }
                alt="Property"
                onError={() => handleImageError(room.id)}
              />

              <div className="card-info">
                <h3 title={room.title}>{room.title}</h3>
                <div className="price-location">
                  <p>
                    <IndianRupee size={14} /> <strong>{room.price}</strong>
                  </p>
                  <p>
                    <MapPin size={14} /> {room.city}
                  </p>
                </div>

                <div className="actions">
                  <button
                    onClick={() => {
                      setEditingRoom(room);
                      setIsModalOpen(true);
                    }}
                    className="edit-btn"
                    disabled={
                      !(room.isAvailable ?? true) || togglingId === room.id
                    }
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleToggleStatus(room)}
                    className={
                      (room.isAvailable ?? true)
                        ? "status-btn-mark-booked"
                        : "status-btn-mark-available"
                    }
                    disabled={togglingId === room.id}
                  >
                    {togglingId === room.id ? (
                      <Loader className="spinner" size={16} />
                    ) : (room.isAvailable ?? true) ? (
                      <>
                        <BookCheck size={16} /> Booked
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
                    disabled={deletingId === room.id}
                  >
                    {deletingId === room.id ? (
                      <Loader className="spinner" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editingRoom && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Details</h3>
              <X onClick={() => setIsModalOpen(false)} size={24} />
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editingRoom.title}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
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
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="save-btn" disabled={isSaving}>
                {isSaving ? (
                  <Loader className="spinner" size={18} />
                ) : (
                  "Save Changes"
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
