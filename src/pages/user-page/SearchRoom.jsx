import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import useRoomSearch from "../../customHook/useRoomSearch";
import RoomFilterBar from "../../components/RoomFilterBar";
import "../../css/search-room.css";

export default function SearchRoom() {
  const navTo = useNavigate();
  const { isPremiumUser } = usePremiumStatus();

  const {
    rooms,
    draftFilters,
    setDraftFilters,
    applyFilters,
    loadRooms,
    hasMore,
    loading,
    page,
    setLocation,
  } = useRoomSearch();

  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: () => loadRooms(page + 1, true),
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDraftFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleUseLocation = () => {
    if (!isPremiumUser) return;
    navigator.geolocation.getCurrentPosition(
      pos => setLocation(pos.coords.latitude, pos.coords.longitude),
      () => alert("Enable location access")
    );
  };

  return (
    <div className="search-room-page">
      <RoomFilterBar
        filters={draftFilters}
        onChange={handleFilterChange}
        onApply={applyFilters}
        onUseLocation={handleUseLocation}
        isPremiumUser={isPremiumUser}
      />

      <div className="rooms-grid">
        {rooms.map(room => (
          <div
            key={room.id}
            className="room-card"
            onClick={() => navTo(`/room/${room.id}`)}
          >
            <img src={room.imageUrls?.[0] || "/placeholder.jpg"} />

            <div className="card-content">
              <h3>{room.title}</h3>
              <p><MapPin size={14} /> {room.city}</p>
              <span className="price">₹{room.price}</span>
              <span className="room-type">{room.roomType}</span>
              <span>View Details <ArrowRight size={14} /></span>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="loader">Loading…</div>}
      {!hasMore && rooms.length > 0 && (
        <div className="loader">No more rooms</div>
      )}
    </div>
  );
}
