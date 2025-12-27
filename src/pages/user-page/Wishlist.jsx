import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/wishlist.css";

function Wishlist() {

  const email = localStorage.getItem("email");   // logged-in user
  const [items, setItems] = useState([]);

  useEffect(() => {
    Api.get(`/wishlist?email=${email}`)
      .then(res => setItems(res.data))
      .catch(err => console.error("Wishlist load failed", err));
  }, []);

  const removeFromWishlist = (roomId) => {
    Api.delete(`/wishlist/${roomId}?email=${email}`)
      .then(() => {
        setItems(prev => prev.filter(i => i.room.id !== roomId));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {items.length === 0 && <p>No saved rooms yet.</p>}

      {items.map(item => (
        <div key={item.id} className="wishlist-card">
          <img src={item.room.imageUrls?.[0]} alt={item.room.title} />

          <div className="wishlist-info">
            <h3>{item.room.title}</h3>
            <p>{item.room.city}</p>
            <p>{item.room.roomType}</p>
            <h4>₹{item.room.price}</h4>

            <button onClick={() => removeFromWishlist(item.room.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
