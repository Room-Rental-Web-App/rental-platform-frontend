import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import AdminSidebar from "./AdminSidebar";
import { Home, Trash2, Loader2 } from "lucide-react";
import "../../CSS/Admin.css";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.ADMIN_ALL_ROOMS, {
        headers: getAuthHeaders(),
      });
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Delete Function Logic
  const handleDelete = async (roomId) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this room?")
    )
      return;

    try {
      // Ensure this endpoint is defined in your apiConfig.js
      await axios.delete(API_ENDPOINTS.DELETE_ROOM_ADMIN(roomId), {
        headers: getAuthHeaders(),
      });

      // Update the UI state to remove the room
      setRooms(rooms.filter((room) => room.id !== roomId));
      alert("Room deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the room. Please check permissions.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <h2>
          <Home /> All Listings
        </h2>

        {loading ? (
          <div className="admin-loader">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="admin-rooms-grid">
            {rooms.map((room) => (
              <div key={room.id} className="admin-room-card">
                <img src={room.imageUrls?.[0]} alt="room" />
                <div className="details">
                  <h4>{room.title}</h4>
                  <p>Owner: {room.ownerEmail}</p>
                  <div className="status">
                    {/* Note: Check if your backend uses 'approved' or 'isApprovedByAdmin' */}
                    Status:{" "}
                    {room.isApprovedByAdmin ? "✅ Approved" : "⏳ Pending"}
                  </div>
                </div>

                {/* ATTACHED THE HANDLER HERE */}
                <button
                  className="del-btn"
                  onClick={() => handleDelete(room.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRooms;
