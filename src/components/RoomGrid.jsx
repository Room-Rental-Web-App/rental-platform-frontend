import React, { useState, useEffect, useCallback } from "react";
import { useWishlist } from "../context/WishlistContext";
import Api from "../api/Api";
import "../css/room-greed.css";
import {
  MapPin,
  ArrowRight,
  Trash2,
  Heart,
  HeartOff,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, getAuthHeaders } from "../api/apiConfig";
import axios from "axios";

function RoomGrid({ rooms, applyFilters }) {
  const [wishlistRoomIds, setWishlistRoomIds] = useState([]);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { fetchCount } = useWishlist();

  /* ==============================
     ADMIN DELETE
  ============================== */

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room permanently?")) return;

    try {
      await Api.delete(`/admin/rooms/${roomId}`);
      applyFilters(); // reload list
    } catch (err) {
      console.error(err);
      alert("Failed to delete room");
    }
  };

  /* ==============================
     ADMIN APPROVAL
  ============================== */

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

      applyFilters(); // FIXED: reload list properly
    } catch (err) {
      console.error(err);
      alert("Action failed. Please try again.");
    }
  };

  /* ==============================
     WISHLIST
  ============================== */

  const fetchWishlistIds = useCallback(async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const res = await Api.get(`/wishlist`, {
        params: { email },
      });

      setWishlistRoomIds(res.data.map((r) => r.room.id));
    } catch (err) {
      console.error("Wishlist load failed", err);
    }
  }, []);

  useEffect(() => {
    fetchWishlistIds();
  }, [fetchWishlistIds]);

  const isInWishlist = (roomId) =>
    wishlistRoomIds.includes(roomId);

  const handleAddToWishlist = async (e, roomId) => {
    e.stopPropagation();

    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please login first");
      return;
    }

    try {
      if (isInWishlist(roomId)) {
        await Api.delete(`/wishlist/${roomId}`, {
          params: { email },
        });

        setWishlistRoomIds((prev) =>
          prev.filter((id) => id !== roomId)
        );
      } else {
        await Api.post(`/wishlist/${roomId}`, null, {
          params: { email },
        });

        setWishlistRoomIds((prev) => [...prev, roomId]);
      }

      fetchCount(); // refresh navbar count
    } catch (err) {
      console.error(err);
    }
  };

  /* ==============================
     ADMIN VIEW
  ============================== */

  if (role === "ROLE_ADMIN") {
    return (
      <div className="admin-rooms-grid">
        {rooms.length === 0 && <p>No rooms found</p>}

        {rooms.map((room) => (
          <div key={room.id} className="admin-room-card">
            <img
              src={room.imageUrls?.[0] || "/placeholder.jpg"}
              alt="room"
              onClick={() => navigate(`/room/${room.id}`)}
            />

            <div className="details">
              <h4>{room.title}</h4>
              <p>City: {room.city}</p>
              <p>Owner: {room.ownerEmail}</p>

              <span
                className={`status ${
                  room.isApprovedByAdmin
                    ? "approved"
                    : "pending"
                }`}
              >
                {room.isApprovedByAdmin
                  ? "Approved"
                  : "Pending"}
              </span>
            </div>

            <div className="action-buttons">
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  handleApproval(room.id, "approve")
                }
              >
                <Check size={16} />
                Approve
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  handleApproval(room.id, "reject")
                }
              >
                <X size={16} />
                Reject
              </button>
            </div>

            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleDelete(room.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    );
  }

  /* ==============================
     PUBLIC VIEW
  ============================== */

  return (
    <div className="rooms-grid">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            onClick={() =>
              navigate(`/room/${room.id}`)
            }
          >
            <img
              src={room.imageUrls?.[0] || "/placeholder.jpg"}
              alt={room.title}
            />

            <button
              className="wishlist-btn"
              onClick={(e) =>
                handleAddToWishlist(e, room.id)
              }
            >
              {isInWishlist(room.id) ? (
                <HeartOff size={18} />
              ) : (
                <Heart size={18} />
              )}
            </button>

            <div className="card-content">
              <h3>{room.title}</h3>

              <p>
                <MapPin size={14} /> {room.city}
              </p>

              <div className="price-type-row">
                <span className="price">
                  ₹{room.price}
                </span>
                <span className="room-type-tag">
                  {room.roomType}
                </span>
              </div>

              <span className="view-link">
                View Details <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-rooms">
          No rooms found for this category.
        </div>
      )}
    </div>
  );
}

export default RoomGrid;
