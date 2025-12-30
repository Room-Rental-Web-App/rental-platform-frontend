import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import Cookies from "js-cookie";
import { Heart } from "lucide-react";
import "../../css/search-room.css";
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import { useNavigate } from "react-router-dom";


function SearchRoom() {

  const [rooms, setRooms] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const navTo = useNavigate();

  const [filters, setFilters] = useState({
    city: "",
    pincode: "",
    roomType: "",
    minPrice: "",
    maxPrice: ""
  });

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const email = Cookies.get("rentalRoom-email");

  useEffect(() => {
    loadWishlist();
    resetAndLoad();
  }, []);

  const loadMore = () => loadRooms(page + 1, true);
  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: loadMore
  });



  const resetAndLoad = () => {
    setRooms([]);
    setPage(0);
    setHasMore(true);
    loadRooms(0, false);
  };


  const loadRooms = async (pageNo, append) => {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await Api.get("/rooms/filter", {
      params: {
        city: filters.city || null,
        pincode: filters.pincode || null,
        roomType: filters.roomType || null,
        minPrice: filters.minPrice || null,
        maxPrice: filters.maxPrice || null,
        page: pageNo,
        size: 10
      }
    });
    console.log(res.data);
    const newRooms = res.data.content;
    setRooms(prev => append ? [...prev, ...newRooms] : newRooms);
    setHasMore(!res.data.last);
    setPage(pageNo);
    setLoading(false);
  };

  const loadWishlist = async () => {
    if (!email) return;
    const res = await Api.get(`/wishlist?email=${email}`);
    setWishlistIds(res.data.map(w => w.room.id));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
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
    <>
      {/* FILTER BAR */}
      <div className="filter-bar">
        <input name="city" placeholder="City" onChange={handleFilterChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleFilterChange} />

        <select name="roomType" onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="Single Room">Single Room</option>
          <option value="Double Room">Double Room</option>
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
        </select>

        <input name="minPrice" type="number" placeholder="Min ₹" onChange={handleFilterChange} />
        <input name="maxPrice" type="number" placeholder="Max ₹" onChange={handleFilterChange} />

        <button onClick={resetAndLoad}>Apply</button>
      </div>

      {/* ROOM GRID */}
      <div className="room-grid">
        {rooms.map(r => (
          <div key={r.id} className="room-card" onClick={()=> navTo(`/room-detail-page/${r.id}`)}>

            <button
              className={`wishlist-btn ${wishlistIds.includes(r.id) ? "active" : ""}`}
              onClick={() => toggleWishlist(r.id)}
            >
              <Heart size={20} />
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

      {loading && <div className="loader">Loading more rooms...</div>}
      {!hasMore && <div className="loader">No more rooms</div>}
    </>
  );
}

export default SearchRoom;
