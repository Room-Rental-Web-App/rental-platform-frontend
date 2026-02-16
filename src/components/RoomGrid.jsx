
import React, { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";

import Api from '../api/Api';
import "../css/room-greed.css"
// useLocation add kiya
import { MapPin, ArrowRight, Trash2, Heart, HeartOff, Check, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, getAuthHeaders } from "../api/apiConfig";
import axios from "axios";


function RoomGrid({ rooms, applyFilters }) {
  const [wishlistRoomIds, setWishlistRoomIds] = useState([]);

  const role = localStorage.getItem("role");
  const navTo = useNavigate();
  const { fetchCount } = useWishlist();

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room permanently?")) return;

    try {
      await Api.delete(`/admin/rooms/${roomId}`);
      alert("Room deleted successfully");
      applyFilters(); // reload list
    } catch (err) {
      console.error(err);
      alert("Failed to delete room");
    }
  };
  const isInWishlist = (roomId) => wishlistRoomIds.includes(roomId);
  const handleApproval = async (id, action) => {
    const confirmMessage = `Are you sure you want to ${action === "approve" ? "Approve" : "Reject"
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
      alert("Action failed. Please try again.");
    }
  };
  const fetchWishlistIds = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    Api.get(`/wishlist?email=${email}`)
      .then((res) => {
        setWishlistRoomIds(res.data.map(r => r.room.id))
      })
      .catch((err) => console.error("Wishlist load failed", err));
    // assuming res.data = [{id: 1}, {id: 5}]

  };

  useEffect(() => {
    fetchWishlistIds()
  }, [])

  const handleAddToWishlist = async (e, roomId) => {
    e.stopPropagation();
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Please login first");
      return;
    }

    try {
      if (wishlistRoomIds.includes(roomId)) {
        await Api.delete(`/wishlist/${roomId}`, { params: { email } });
        setWishlistRoomIds(prev => prev.filter(id => id !== roomId));
        alert("room remove")
      } else {
        await Api.post(`/wishlist/${roomId}`, null, { params: { email } });
        setWishlistRoomIds(prev => [...prev, roomId]);
        alert("room Saved")
      }

      fetchCount(); // refresh navbar count
    } catch (err) {
      console.error(err);
    }
  };


  if (role == "ROLE_ADMIN") return (
    <div className="admin-rooms-grid">
      {rooms.length === 0 && <p>No rooms found</p>}

      {rooms.map((room) => (
        <div key={room.id} className="admin-room-card">
          <img
            src={room.imageUrls?.[0] || "/placeholder.jpg"}
            alt="room"
            onClick={() => navTo(`/room/${room.id}`)}
          />

          <div className="details">
            <h4>{room.title}</h4>
            <p>City: {room.city}</p>
            <p>Owner: {room.ownerEmail}</p>

            <span className={`status ${room.isApprovedByAdmin ? "approved" : "pending"}`}>
              {room.isApprovedByAdmin ? "Approved" : "Pending"}
            </span>
          </div>
          <div className="action-buttons">
            <button onClick={() => handleApproval(room.id, "approve")} className="btn-approve"><Check size={18} /> Approve</button>
            <button onClick={() => handleApproval(room.id, "reject")} className="btn-reject"> <X size={18} /> Reject</button>
          </div>

          <button
            className="del-btn"
            onClick={() => handleDelete(room.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  )
  else return (
    <div className="rooms-grid">
      {rooms.length > 0
        ? rooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            onClick={() => navTo(`/room/${room.id}`)}
          >
            <img
              src={room.imageUrls?.[0] || "/placeholder.jpg"}
              alt={room.title}
            />

            <button
              className="wishlist-btn"
              onClick={(e) => handleAddToWishlist(e, room.id)}
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
                <span className="price">₹{room.price}</span>
                <span className="room-type-tag">{room.roomType}</span>
              </div>

              <span className="view-link">
                View Details <ArrowRight size={14} />
              </span>
            </div>
          </div>

        ))
        : (
          <div className="no-rooms">No rooms found for this category.</div>
        )}
    </div>
  )
}

export default RoomGrid