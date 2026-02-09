import React from 'react'
import Api from '../api/Api';
import "../css/room-greed.css"
import { Trash2 } from "lucide-react"
// useLocation add kiya
import { MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';


function RoomGrid({ rooms, applyFilters }) {
    const role = localStorage.getItem("role");
    const navTo = useNavigate();
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
          :  (
              <div className="no-rooms">No rooms found for this category.</div>
            )}
      </div>
    )
}

export default RoomGrid