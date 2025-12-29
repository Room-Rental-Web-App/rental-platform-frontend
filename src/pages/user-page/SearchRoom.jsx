import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import { Link } from "react-router-dom";
import { Heart, MapPin, ArrowRight, Search } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import "../../CSS/search-room.css";
// Note: Ensure search-room.css has styles for the AllRooms card structure

function SearchRoom() {
  const [rooms, setRooms] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { fetchCount } = useWishlist();

  const [filters, setFilters] = useState({
    city: "",
    pincode: "",
    roomType: "",
    minPrice: "",
    maxPrice: "",
  });

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Using localStorage for email consistency as per your AllRooms logic
  const email = localStorage.getItem("email");

  useEffect(() => {
    loadWishlist();
    resetAndLoad();
  }, []);

  const loadMore = () => {
    if (hasMore && !loading) {
      loadRooms(page + 1, true);
    }
  };

  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: loadMore,
  });

  const resetAndLoad = () => {
    setRooms([]);
    setPage(0);
    setHasMore(true);
    loadRooms(0, false);
  };

  const loadRooms = async (pageNo, append) => {
    setLoading(true);
    try {
      const res = await Api.get("/rooms/filter", {
        params: {
          city: filters.city || null,
          pincode: filters.pincode || null,
          roomType: filters.roomType || null,
          minPrice: filters.minPrice || null,
          maxPrice: filters.maxPrice || null,
          page: pageNo,
          size: 10,
        },
      });

      const newRooms = res.data.content;
      setRooms((prev) => (append ? [...prev, ...newRooms] : newRooms));
      setHasMore(!res.data.last);
      setPage(pageNo);
    } catch (err) {
      console.error("Error loading rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    if (!email) return;
    try {
      const res = await Api.get(`/wishlist?email=${email}`);
      setWishlistIds(res.data.map((w) => w.room.id));
    } catch (err) {
      console.error("Wishlist load failed", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleWishlist = async (e, roomId) => {
    e.preventDefault();
    if (!email) return alert("Please login first!");

    try {
      if (wishlistIds.includes(roomId)) {
        await Api.delete(`/wishlist/${roomId}?email=${email}`);
        setWishlistIds((prev) => prev.filter((id) => id !== roomId));
      } else {
        await Api.post(`/wishlist/${roomId}?email=${email}`);
        setWishlistIds((prev) => [...prev, roomId]);
      }
      fetchCount(); // Updates the Navbar Badge instantly
    } catch (err) {
      console.error("Wishlist update failed", err);
    }
  };

  return (
    <div className="search-room-page">
      {/* --- FILTER BAR (MODERN) --- */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input name="city" placeholder="City" onChange={handleFilterChange} />
          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleFilterChange}
          />

          <select name="roomType" onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="Single Room">Single Room</option>
            <option value="Double Room">Double Room</option>
            <option value="PG">PG</option>
            <option value="Flat">Flat</option>
          </select>

          <input
            name="minPrice"
            type="number"
            placeholder="Min ₹"
            onChange={handleFilterChange}
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max ₹"
            onChange={handleFilterChange}
          />

          <button className="apply-btn" onClick={resetAndLoad}>
            <Search size={18} /> Apply
          </button>
        </div>
      </div>

      {/* --- ROOM GRID (Matches AllRooms Design) --- */}
      <div className="rooms-grid">
        {rooms.length > 0
          ? rooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="card-image">
                  <img
                    src={room.imageUrls?.[0] || "/placeholder.jpg"}
                    alt={room.title}
                  />
                  <button
                    className={`wishlist-btn ${
                      wishlistIds.includes(room.id) ? "active" : ""
                    }`}
                    onClick={(e) => toggleWishlist(e, room.id)}
                  >
                    <Heart
                      size={20}
                      fill={wishlistIds.includes(room.id) ? "#ef4444" : "none"}
                    />
                  </button>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3>{room.title}</h3>
                    <span className="room-price">₹{room.price}</span>
                  </div>

                  <p className="room-loc">
                    <MapPin size={14} /> {room.city}
                  </p>

                  <div className="card-footer">
                    <span className="room-type">{room.roomType}</span>
                    <Link to={`/room/${room.id}`} className="details-link">
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <p className="no-rooms">No rooms found matching your search.</p>
            )}
      </div>

      {loading && <div className="loader">Loading more rooms...</div>}
      {!hasMore && rooms.length > 0 && (
        <div className="loader">No more rooms</div>
      )}
    </div>
  );
}

export default SearchRoom;
