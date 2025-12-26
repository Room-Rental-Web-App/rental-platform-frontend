
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { Edit, Trash2, X, MapPin, IndianRupee } from "lucide-react";
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    try {
      await axios.delete(API_ENDPOINTS.DELETE_ROOM(id), {
        params: { email: localStorage.getItem("email") },
        headers: getAuthHeaders(),
      });
      setRooms(rooms.filter((r) => r.id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      alert("Delete failed. Check logs.");
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
        }
      );
      setRooms(rooms.map((r) => (r.id === editingRoom.id ? res.data : r)));
      setIsModalOpen(false);
      alert("Updated!");
    } catch (err) {
      alert("Update failed.");
    }
  };

  return (
    <div className="my-listings-container">
      <h2>Your Properties</h2>
      <div className="listings-grid">
        {rooms.map((room) => (
          <div key={room.id} className="listing-card">
            <img
              src={room.imageUrls?.[0] || "https://placehold.co/300x200"}
              alt="room"
            />
            <div className="card-info">
              <h3>{room.title}</h3>
              <p>
                <IndianRupee size={14} /> {room.price}/month
              </p>
              <p>
                <MapPin size={14} /> {room.city}
              </p>
              <div className="actions">
                <button
                  onClick={() => {
                    setEditingRoom(room);
                    setIsModalOpen(true);
                  }}
                  className="edit-btn"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="delete-btn"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Listing</h3>
              <X
                onClick={() => setIsModalOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Title</label>
                <input
                  value={editingRoom.title}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={editingRoom.price}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, price: e.target.value })
                  }
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
                />
              </div>
              <button type="submit" className="save-btn">
                Update Room
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
