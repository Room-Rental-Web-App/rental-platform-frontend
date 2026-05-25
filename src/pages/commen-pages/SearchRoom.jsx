import { useLocation } from "react-router-dom";
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import useRoomSearch from "../../customHook/useRoomSearch";
import RoomFilterBar from "../../components/RoomFilterBar";
import "../../CSS/search-room.css";
import MapPicker from "../../components/MapPicker";
import { useState, useEffect } from "react";
import RoomGrid from "../../components/RoomGrid";

export default function SearchRoom() {
  const location = useLocation();
  const { isPremiumUser } = usePremiumStatus();
  const [openMap, setOpenMap] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);

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
  } = useRoomSearch({ mode: "PUBLIC" });

  // URL se roomType uthana
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromUrl = queryParams.get("type");
    if (typeFromUrl) {
      setDraftFilters((prev) => ({ ...prev, roomType: typeFromUrl }));
      applyFilters({ roomType: typeFromUrl });
    }
  }, [location.search]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ RoomFilterBar se { lat, lng, city, pincode } aata hai
  // applyFilters mein location bhi pass karo — ek hi call mein sab ho jaega
  const handleUseLocation = ({ lat, lng, city, pincode }) => {
    if (!isPremiumUser) return;

    // Filters update karo
    setDraftFilters((prev) => ({
      ...prev,
      city: city || prev.city,
      pincode: pincode || prev.pincode,
    }));

    // ✅ applyFilters mein location pass karo — rooms fetch honge
    applyFilters(
      {
        ...draftFilters,
        city: city || draftFilters.city,
        pincode: pincode || draftFilters.pincode,
      },
      { lat, lng }, // ✅ location bhi pass
    );
  };

  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: () => loadRooms(page + 1, true),
  });

  return (
    <div className="search-room-page">
      <RoomFilterBar
        filters={draftFilters}
        onChange={handleFilterChange}
        onApply={applyFilters}
        onUseLocation={handleUseLocation}
        isPremiumUser={isPremiumUser}
      />

      {openMap && mapCenter && (
        <MapPicker
          center={mapCenter}
          onClose={() => setOpenMap(false)}
          onConfirm={(lat, lng) => {
            setLocation(lat, lng);
            setOpenMap(false);
          }}
        />
      )}

      {loading && <div className="loader">Loading…</div>}
      {!loading && <RoomGrid rooms={rooms} applyFilters={applyFilters} />}
      {!hasMore && rooms.length > 0 && <div className="loader"></div>}
    </div>
  );
}
