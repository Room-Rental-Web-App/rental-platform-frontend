import React, { useState, useEffect, useCallback } from "react";
import { useWishlist } from "../context/WishlistContext";
import Api from "../api/Api";
import "../CSS/room-grid.css";
import {
  MapPin,
  ArrowRight,
  Trash2,
  Heart,
  Check,
  X,
  Wifi,
  AirVent,
  Star,
  CircleOff,
  Ruler,
  ParkingCircle,
  Dumbbell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, getAuthHeaders } from "../api/apiConfig";
import axios from "axios";

/* Map amenity keys → icon + label */
const AMENITY_MAP = {
  wifi:    { icon: <Wifi size={11} />,           label: "WiFi" },
  ac:      { icon: <AirVent size={11} />,        label: "AC" },
  parking: { icon: <ParkingCircle size={11} />,  label: "Parking" },
  gym:     { icon: <Dumbbell size={11} />,       label: "Gym" },
  lift:    { label: "Lift" },
};

function RoomGrid({ rooms, applyFilters }) {
  const [wishlistRoomIds, setWishlistRoomIds] = useState([]);
  const [togglingIds, setTogglingIds]         = useState(new Set());

  const role     = localStorage.getItem("role");
  const navigate = useNavigate();
  const { fetchCount } = useWishlist();

  /* ── Load wishlist IDs ── */
  const fetchWishlistIds = useCallback(async () => {
    const email = localStorage.getItem("email");
    if (!email) return;
    try {
      const res = await Api.get(`/wishlist`, { params: { email } });
      setWishlistRoomIds(res.data.map((r) => r.room.id));
    } catch (err) {
      console.error("Wishlist load failed", err);
    }
  }, []);

  useEffect(() => { fetchWishlistIds(); }, [fetchWishlistIds]);

  const isInWishlist = (id) => wishlistRoomIds.includes(id);

  /* ── Wishlist toggle ── */
  const handleAddToWishlist = async (e, roomId) => {
    e.stopPropagation();
    const email = localStorage.getItem("email");
    if (!email) { alert("Please login first"); return; }

    const wasIn = isInWishlist(roomId);
    setTogglingIds((p) => new Set(p).add(roomId));
    // Optimistic update
    setWishlistRoomIds((p) =>
      wasIn ? p.filter((id) => id !== roomId) : [...p, roomId]
    );
    try {
      if (wasIn) {
        await Api.delete(`/wishlist/${roomId}`, { params: { email } });
      } else {
        await Api.post(`/wishlist/${roomId}`, null, { params: { email } });
      }
      fetchCount();
    } catch (err) {
      console.error(err);
      // Rollback on error
      setWishlistRoomIds((p) =>
        wasIn ? [...p, roomId] : p.filter((id) => id !== roomId)
      );
    } finally {
      setTogglingIds((p) => { const n = new Set(p); n.delete(roomId); return n; });
    }
  };

  /* ── Admin delete ── */
  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room permanently?")) return;
    try {
      await Api.delete(`/admin/rooms/${roomId}`);
      applyFilters();
    } catch {
      alert("Failed to delete room");
    }
  };

  /* ── Admin approve / reject ── */
  const handleApproval = async (id, action) => {
    const label = action === "approve" ? "Approve" : "Reject";
    if (!window.confirm(`${label} this listing?`)) return;
    try {
      const endpoint = action === "approve"
        ? API_ENDPOINTS.APPROVE_ROOM(id)
        : API_ENDPOINTS.REJECT_ROOM(id);
      await axios.put(endpoint, {}, { headers: getAuthHeaders() });
      applyFilters();
    } catch {
      alert("Action failed. Please try again.");
    }
  };

  /* ==================================================
     ADMIN VIEW
  ================================================== */
  if (role === "ROLE_ADMIN") {
    return (
      <div className="admin-rooms-grid">
        {rooms.length === 0 && (
          <p className="no-rooms-msg">No rooms found.</p>
        )}

        {rooms.map((room, index) => (
          <div
            key={room.id}
            className="admin-room-card"
            style={{ "--card-delay": `${index * 0.05}s` }}
          >
            {/* Image */}
            <div
              className="admin-img-wrap"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <img
                src={room.imageUrls?.[0] || "/placeholder.jpg"}
                alt={room.title}
                loading="lazy"
              />
              {room.isFeatured && (
                <span className="featured-pill">
                  <Star size={10} fill="currentColor" /> Featured
                </span>
              )}
            </div>

            {/* Details */}
            <div className="details">
              <h4>{room.title}</h4>

              <div className="admin-meta-row">
                <span>📍 {room.city} – {room.pincode}</span>
              </div>
              <div className="admin-meta-row">
                <span>🏠 {room.roomType}</span>
                <span>👤 {room.availableFor}</span>
              </div>
              <div className="admin-meta-row muted">
                <span>✉ {room.ownerEmail}</span>
              </div>

              <div className="admin-meta-row" style={{ marginTop: 6 }}>
                <span className="price-sm">
                  ₹{room.price?.toLocaleString("en-IN")}<small>/mo</small>
                </span>
                <span className={`status ${room.isApprovedByAdmin ? "approved" : "pending"}`}>
                  {room.isApprovedByAdmin ? "Approved" : "Pending"}
                </span>
                {!room.isAvailable && (
                  <span className="status unavailable">Unavailable</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="action-buttons">
              {!room.isApprovedByAdmin && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleApproval(room.id, "approve")}
                >
                  <Check size={13} /> Approve
                </button>
              )}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleApproval(room.id, "reject")}
              >
                <X size={13} /> Reject
              </button>
              <button
                className="btn btn-ghost btn-sm"
                title="Delete room"
                style={{ marginLeft: "auto" }}
                onClick={() => handleDelete(room.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ==================================================
     PUBLIC VIEW
  ================================================== */
  return (
    <div className="rooms-grid">
      {rooms.length > 0 ? (
        rooms.map((room, index) => (
          <div
            key={room.id}
            className={`room-card${!room.isAvailable ? " unavailable-card" : ""}`}
            style={{ "--card-delay": `${index * 0.06}s` }}
            onClick={() => navigate(`/room/${room.id}`)}
          >
            {/* Image block */}
            <div className="room-card-img-wrap">
              <img
                src={room.imageUrls?.[0] || "/placeholder.jpg"}
                alt={room.title}
                loading="lazy"
              />

              {room.isFeatured && (
                <span className="featured-pill">
                  <Star size={10} fill="currentColor" /> Featured
                </span>
              )}

              {!room.isAvailable && (
                <div className="unavailable-overlay">
                  <CircleOff size={16} /> Not Available
                </div>
              )}

              {room.roomType && (
                <span className="img-badge">{room.roomType}</span>
              )}
            </div>

            {/* Wishlist heart (only for logged-in users) */}
            {role === "ROLE_USER" && (
              <button
                className={`wishlist-btn${isInWishlist(room.id) ? " saved" : ""}`}
                onClick={(e) => handleAddToWishlist(e, room.id)}
                disabled={togglingIds.has(room.id)}
                title={isInWishlist(room.id) ? "Remove from saved" : "Save room"}
              >
                <Heart
                  size={15}
                  fill={isInWishlist(room.id) ? "currentColor" : "none"}
                />
              </button>
            )}

            {/* Card content */}
            <div className="card-content">
              <h3>{room.title}</h3>

              {/* City + pincode */}
              <p className="card-city">
                <MapPin size={12} />
                {room.city}
                {room.pincode && (
                  <span className="pincode">– {room.pincode}</span>
                )}
              </p>

              {/* Area */}
              {room.area > 0 && (
                <p className="card-area">
                  <Ruler size={12} />
                  {room.area} sq.ft &nbsp;·&nbsp; {room.availableFor}
                </p>
              )}

              {/* Amenity chips */}
              {room.amenities?.length > 0 && (
                <div className="amenity-chips">
                  {room.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="amenity-chip">
                      {AMENITY_MAP[a]?.icon}
                      {AMENITY_MAP[a]?.label ?? a}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="amenity-chip more">
                      +{room.amenities.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="price-type-row">
                <span className="price">
                  ₹{room.price?.toLocaleString("en-IN")}
                  <small>/mo</small>
                </span>
              </div>

              <span className="view-link">
                View Details <ArrowRight size={13} />
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="no-rooms">No rooms found for this category.</div>
      )}
    </div>
  );
}

export default RoomGrid;