import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../CSS/wishlist.css";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import MyLoader from "../../components/MyLoader";
import { ArrowRight, Heart, X, MapPin } from "lucide-react";

function Wishlist() {
  const email = localStorage.getItem("email");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState(new Set());
  const navTo = useNavigate();

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
    // Optimistic: mark as removing for visual feedback
    setRemovingIds((prev) => new Set(prev).add(roomId));

    Api.delete(`/wishlist/${roomId}?email=${email}`)
      .then(() => {
        setItems((prev) => prev.filter((i) => i.room.id !== roomId));
        fetchCount();
      })
      .catch((err) => {
        console.error("Delete failed", err);
        // Rollback on error
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(roomId);
          return next;
        });
      });
  };

  if (loading) return <MyLoader data={"Loading Saved Rooms... Please wait..."} />;

  return (
    <div className="wishlist-container">
      {/* Header */}
      <div className="wishlist-header">
        <h2>Saved Rooms</h2>
        {items.length > 0 && (
          <span className="wishlist-count-badge">{items.length}</span>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="empty-state">
          <span className="empty-state-icon">🏠</span>
          <h3>No saved rooms yet</h3>
          <p>Rooms you save while browsing will appear here for easy access.</p>
          <button className="empty-state-btn" onClick={() => navTo("/search")}>
            Browse Rooms
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="wishlist-grid">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="wishlist-card"
            style={{ "--card-delay": `${index * 0.07}s` }}
          >
            {/* Image */}
            <div className="wishlist-card-img-wrap">
              <img
                src={item.room.imageUrls?.[0] || "https://placehold.co/400x250/f1f3f5/adb5bd?text=No+Image"}
                alt={item.room.title}
                loading="lazy"
              />

              {/* Room type pill */}
              {item.room.roomType && (
                <span className="img-type-pill">{item.room.roomType}</span>
              )}

              {/* Quick remove icon on image */}
              <button
                className="wishlist-remove-icon"
                title="Remove from saved"
                onClick={() => removeFromWishlist(item.room.id)}
                disabled={removingIds.has(item.room.id)}
              >
                <Heart size={15} fill={removingIds.has(item.room.id) ? "none" : "currentColor"} />
              </button>
            </div>

            {/* Info */}
            <div className="wishlist-info">
              <h3>{item.room.title}</h3>

              <p className="loc">{item.room.city}</p>

              <div className="price-row">
                <h4>₹{item.room.price?.toLocaleString("en-IN")}</h4>
                <span>/month</span>
              </div>

              {/* Actions */}
              <div className="card-actions">
                <span
                  className="view-link"
                  role="button"
                  onClick={() => navTo(`/room/${item.room.id}`)}
                >
                  View Details <ArrowRight size={14} />
                </span>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.room.id)}
                  disabled={removingIds.has(item.room.id)}
                >
                  {removingIds.has(item.room.id) ? "Removing…" : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;