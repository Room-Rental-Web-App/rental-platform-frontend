import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MapPin, ArrowRight, Search, Locate } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import "../../css/search-room.css";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import { premiumGuard } from "../../customHook/premiumGuard";

function SearchRoom() {
  const [rooms, setRooms] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const { isPremiumUser } = usePremiumStatus();


  const navTo = useNavigate();
  const email = localStorage.getItem("email");
  const { fetchCount } = useWishlist();

  const [filters, setFilters] = useState({
    city: null,
    pincode: null,
    roomType: null,
    minPrice: null,
    maxPrice: null,
    radiusKm: 2
  });

  useEffect(() => {
    loadWishlist();
    resetAndLoad();
  }, []);

  function loadUserLocation() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        resetAndLoad();
      },
      err => console.log("Location blocked")
    );

  }
  console.log(userLocation);

  useInfiniteScroll({ hasMore, loading, onLoadMore: () => loadRooms(page + 1, true) });

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
          city: filters.city,
          pincode: filters.pincode,
          roomType: filters.roomType,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          page: pageNo,
          size: 15,

          userLat: userLocation?.lat,
          userLng: userLocation?.lng,
          radiusKm: filters.radiusKm,
        },
      });

      setRooms(prev => append ? [...prev, ...res.data.content] : res.data.content);
      console.log(res.data);
      setHasMore(!res.data.last);
      setPage(pageNo);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!premiumGuard(navTo)) return;
    loadUserLocation();
  };


  const loadWishlist = async () => {
    if (!email) return;
    const res = await Api.get(`/wishlist?email=${email}`);
    setWishlistIds(res.data.map(w => w.room.id));
  };

  const toggleWishlist = async (e, id) => {
    e.stopPropagation();
    if (!email) return alert("Login first");

    if (wishlistIds.includes(id)) {
      await Api.delete(`/wishlist/${id}?email=${email}`);
      setWishlistIds(prev => prev.filter(x => x !== id));
    } else {
      await Api.post(`/wishlist/${id}?email=${email}`);
      setWishlistIds(prev => [...prev, id]);
    }
    fetchCount();
  };

  return (
    <div className="search-room-page">
      <div className="filter-bar">
        <input name="city" placeholder="City" onChange={e => setFilters({ ...filters, city: e.target.value })} />
        <input name="pincode" placeholder="Pincode" onChange={e => setFilters({ ...filters, pincode: e.target.value })} />
        <select onChange={e => setFilters({ ...filters, roomType: e.target.value })}>
          <option value="">All Types</option>
          <option value="Single Room">Single Room</option>
          <option value="Double Room">Double Room</option>
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
        </select>
        <input type="number" placeholder="Min ₹" onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
        <input type="number" placeholder="Max ₹" onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />
        <input type="number" placeholder="Radius (km)" value={filters.radiusKm} onChange={e => setFilters({ ...filters, radiusKm: e.target.value })} />

        {isPremiumUser && <button onClick={loadUserLocation}><Locate size={16} /> Use My Location</button>}
        <button blocked={true} onClick={handleUseLocation}><Locate size={16} /> Use My Location</button>
        <button onClick={resetAndLoad}><Search size={16} /> Apply</button>
      </div>

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card" onClick={() => navTo(`/room/${room.id}`)}>
            <img src={room.imageUrls?.[0] || "/placeholder.jpg"} />
            <button
              className={`wishlist-btn ${wishlistIds.includes(room.id) ? "active" : ""}`}
              onClick={e => toggleWishlist(e, room.id)}
            >
              <Heart size={18} fill={wishlistIds.includes(room.id) ? "#ef4444" : "none"} />
            </button>

            <div className="card-content">
              <h3>{room.title}</h3>
              <p><MapPin size={14} /> {room.city}</p>
              <span className="price">₹{room.price}</span>
              <span className="room-type">{room.roomType}</span>
              <Link to={`/room/${room.id}`}>View Details <ArrowRight size={14} /></Link>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="loader">Loading…</div>}
      {!hasMore && rooms.length > 0 && <div className="loader">No more rooms</div>}
    </div>
  );
}

export default SearchRoom;
