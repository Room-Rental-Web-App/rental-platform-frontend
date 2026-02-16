import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/wishlist.css";
// IMPORT: Added the hook to talk to the Navbar
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import MyLoader from "../../components/MyLoader";

function Wishlist() {
  const email = localStorage.getItem("email");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navTo = useNavigate();

  // HOOK: Get the fetchCount function from Context
  const { fetchCount } = useWishlist();

  useEffect(() => {
    if (email) {
      Api.get(`/wishlist?email=${email}`)
        .then((res) => setItems(res.data))
        .catch((err) => console.error("Wishlist load failed", err))
        .finally(() => setLoading(false));
    }
  }, [email]);

  const removeFromWishlist = (roomId) => {
    Api.delete(`/wishlist/${roomId}?email=${email}`)
      .then(() => {
        // 1. Remove from the local list on this page
        setItems((prev) => prev.filter((i) => i.room.id !== roomId));

        // 2. IMPORTANT: Update the Navbar count automatically
        fetchCount();
      })
      .catch((err) => console.error("Delete failed", err));
  };
  
  if (loading) return <MyLoader data={"Loading Saved Rooms... Please wait..."} />

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {items.length === 0 && <p className="empty-msg">No saved rooms yet.</p>}

      <div className="wishlist-grid">
        {items.map((item) => (
          <div key={item.id} className="wishlist-card">
            {/* Added fallback image check */}
            <img
              src={
                item.room.imageUrls?.[0] || "https://via.placeholder.com/300"
              }
              alt={item.room.title}
            />

            <div className="wishlist-info">
              <h3>{item.room.title}</h3>
              <p className="loc">{item.room.city}</p>
              <p className="type">{item.room.roomType}</p>
              <h4>₹{item.room.price}</h4>
              <span className="view-link" onClick={() => navTo(`/room/${item.id}`)}>view detalils</span>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.room.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
