import { useLocation } from "react-router-dom"; 
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import useRoomSearch from "../../customHook/useRoomSearch";
import RoomFilterBar from "../../components/RoomFilterBar";
import "../../css/search-room.css";
import MapPicker from "../../components/MapPicker";
import { useState, useEffect } from "react"; // useEffect add kiya
import RoomGrid from "../../components/RoomGrid";
import MyLoader from "../../components/MyLoader";

export default function SearchRoom() {
  const location = useLocation(); // URL track karne ke liye
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

  // --- NAYA LOGIC: URL se Type uthane ke liye ---
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromUrl = queryParams.get("type");

    if (typeFromUrl) {
      // URL mein 'type' milte hi use filters mein set karo
      setDraftFilters((prev) => ({ ...prev, roomType: typeFromUrl }));

      // Turant filters apply karwa do taaki backend hit ho jaye
      // Note: roomType wahi hona chahiye jo aapke Backend/FilterBar mein use ho raha hai
      applyFilters({ ...draftFilters, roomType: typeFromUrl });
    }
  }, [location.search]); // Jab bhi URL change ho, ye chale
  // ----------------------------------------------

  useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: () => loadRooms(page + 1, true),
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseLocation = () => {
    if (!isPremiumUser) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMapCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setOpenMap(true);
      },
      () => alert("Enable location access"),
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

     

      {loading &&  <MyLoader data={"Loding Rooms..."} />}
      {!loading && <RoomGrid rooms={rooms} applyFilters={applyFilters}/>}
      {!hasMore && rooms.length > 0 && (
        <div className="loader">No more rooms</div>
      )}
    </div>
  );
}
