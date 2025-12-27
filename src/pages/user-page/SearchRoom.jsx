import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import Cookies from "js-cookie";
import { Heart } from "lucide-react";
import "../../css/search-room.css";

function SearchRoom() {

  const [rooms, setRooms] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const email = Cookies.get("rentalRoom-email");

  useEffect(() => {
    loadRooms();
    loadWishlist();
  }, []);

  const loadRooms = async () => {
    const res = await Api.get("/rooms/findRoom");
    setRooms(res.data);
  };

  const loadWishlist = async () => {
    if (!email) return;
    const res = await Api.get(`/wishlist?email=${email}`);
    setWishlistIds(res.data.map(w => w.room.id));
  };

  const toggleWishlist = async (roomId) => {
    if (!email) return alert("Login first");

    if (wishlistIds.includes(roomId)) {
      await Api.delete(`/wishlist/${roomId}?email=${email}`);
      setWishlistIds(prev => prev.filter(id => id !== roomId));
    } else {
      await Api.post(`/wishlist/${roomId}?email=${email}`);
      setWishlistIds(prev => [...prev, roomId]);
    }
  };

  return (
    <div className="room-grid">
      {rooms.map(r => (
        <div key={r.id} className="room-card">

          <button
            className={`wishlist-btn ${wishlistIds.includes(r.id) ? "active" : ""}`}
            onClick={() => toggleWishlist(r.id)}
          >
            <Heart size={20}/>
          </button>

          <img src={r.imageUrls?.[0] || "/placeholder.jpg"} />

          <div className="room-body">
            <div className="room-title">{r.title}</div>
            <div className="room-location">{r.city} • {r.pincode}</div>
            <div className="room-price">₹{r.price}</div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default SearchRoom;
