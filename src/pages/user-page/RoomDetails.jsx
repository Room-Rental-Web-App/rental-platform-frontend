import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// Direct apiConfig se endpoints aur headers import kiye
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { Heart, MapPin, Phone, Info } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import "../../css/RoomDetails.css";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const { fetchCount } = useWishlist();
  const email = localStorage.getItem("email");

  useEffect(() => {
    // 1. URL ke liye API_ENDPOINTS use kiya
    // 2. Token ke liye getAuthHeaders() use kiya
    axios
      .get(API_ENDPOINTS.GET_ROOM_BY_ID(id), {
        headers: getAuthHeaders(),
      })
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => {
        console.error("Failed to load room details", err);
      });
  }, [id]);

  const handleWishlist = async () => {
    if (!email) return alert("Please Login First");
    try {
      // Wishlist ke liye bhi apiConfig ka use
      await axios.post(API_ENDPOINTS.WISHLIST_ADD(id), null, {
        params: { email: email },
        headers: getAuthHeaders(),
      });
      fetchCount();
      alert("Added to Wishlist!");
    } catch (err) {
      alert("Error adding to wishlist. Check login status.");
    }
  };

  if (!room) return <div className="loader">Loading details...</div>;

  return (
    <div className="room-details-page">
      <div className="image-gallery">
        {room.imageUrls && room.imageUrls.length > 0 ? (
          room.imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Room ${index}`} />
          ))
        ) : (
          <img src="https://via.placeholder.com/400" alt="Room" />
        )}
      </div>

      <div className="room-content">
        <h1>{room.title}</h1>
        <p className="price">₹{room.price} / month</p>

        <div className="info-grid">
          <span>
            <MapPin size={18} /> {room.city}, {room.pincode}
          </span>
          <span>
            <Info size={18} /> {room.roomType}
          </span>
          <span>
            <Phone size={18} /> {room.phone || room.contactNumber || "N/A"}
          </span>
        </div>

        <p className="description">{room.description}</p>

        <div className="action-buttons">
          <button className="btn-wishlist" onClick={handleWishlist}>
            <Heart size={20} /> Add to Wishlist
          </button>
          <button className="btn-book">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
