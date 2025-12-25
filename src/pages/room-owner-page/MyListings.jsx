/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, MapPin, IndianRupee } from "lucide-react";
import "../../css/MyListings.css";

const MyListings = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    fetchMyRooms();
  }, []);

  /**
   * Retrieves all property listings owned by the logged-in user.
   */
  const fetchMyRooms = async () => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      // Verify if email exists before making the request
      if (!email) {
        console.error("Owner email missing in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/api/rooms/my-listings?email=${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Full Data from Backend:", res.data);
      setRooms(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setLoading(false);
    }
  };

  /**
   * Triggers the deletion process for a specific listing.
   * @param {number} id - The ID of the room to be deleted.
   */
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this listing permanently?"
      )
    ) {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        await axios.delete(
          `http://localhost:8080/api/rooms/delete/${id}?email=${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update local state to remove the deleted item immediately
        setRooms(rooms.filter((room) => room.id !== id));
        alert("Property Listing Deleted Successfully.");
      } catch (err) {
        console.error("Deletion Error:", err);
        alert("Failed to delete the listing. Please try again.");
      }
    }
  };

  if (loading) return <div className="loader">Loading your properties...</div>;

  return (
    <div className="my-listings-container">
      <h2>My Property Listings</h2>
      <div className="listings-grid">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="listing-card">
              {/* --- SAFE IMAGE RENDERING --- */}
              {/* Optional chaining and check ensures app doesn't crash if images are missing */}
              <img
                src={
                  room.imageUrls && room.imageUrls.length > 0
                    ? room.imageUrls[0]
                    : "https://placehold.co/300x200?text=No+Image"
                }
                alt={room.title}
                className="card-img"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/300x200?text=Error+Loading";
                }}
              />
              <div className="card-content">
                <h3>{room.title || "Untitled Property"}</h3>
                <p>
                  <MapPin size={14} /> {room.city}, {room.pincode}
                </p>
                <p className="price">
                  <IndianRupee size={14} />{" "}
                  {room.price ? room.price.toLocaleString("en-IN") : "0"} /
                  month
                </p>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => alert("Edit feature under development.")}
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(room.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-listings">
            <p>You haven't added any properties yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
