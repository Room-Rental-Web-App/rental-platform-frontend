import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import AdminSidebar from "./AdminSidebar";
import { Home, Trash2 } from "lucide-react";
import "../../CSS/Admin.css";
const AllRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.ADMIN_ALL_ROOMS, {
          headers: getAuthHeaders(),
        });
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <h2>
          <Home /> All Listings
        </h2>
        <div className="admin-rooms-grid">
          {rooms.map((room) => (
            <div key={room.id} className="admin-room-card">
              <img src={room.imageUrls?.[0]} alt="room" />
              <div className="details">
                <h4>{room.title}</h4>
                <p>Owner: {room.ownerEmail}</p>
                <div className="status">
                  Status: {room.approved ? "✅ Approved" : "⏳ Pending"}
                </div>
              </div>
              <button className="del-btn">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllRooms;
