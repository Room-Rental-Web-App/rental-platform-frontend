import { useLocation } from "react-router-dom";
import useInfiniteScroll from "../../customHook/useInfiniteScroll";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import useRoomSearch from "../../customHook/useRoomSearch";
import RoomFilterBar from "../../components/RoomFilterBar";
import MapPicker from "../../components/MapPicker";
import { useState, useEffect } from "react";
import RoomGrid from "../../components/RoomGrid";
import MyLoader from "../../components/MyLoader";
import "../../CSS/search-room.css";

export default function SearchRoom({ approved }) {
  const location = useLocation();
  const { isPremiumUser } = usePremiumStatus();

  const [openMap, setOpenMap] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    rooms,
    draftFilters,
    setDraftFilters,
    applyFilters,
    loadRooms,
    hasMore,
    initialLoading,
    loadingMore,
    page,
    setLocation,
  } = useRoomSearch({
    mode: "PUBLIC",
    approved,
  });

  /* ==========================
     URL TYPE SYNC
  ========================== */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromUrl = queryParams.get("type");

    if (typeFromUrl) {
      const updated = { ...draftFilters, roomType: typeFromUrl };
      setDraftFilters(updated);
      applyFilters(updated);
    }
    // eslint-disable-next-line
  }, [location.search]);

  /* ==========================
     Infinite Scroll
  ========================== */
  useInfiniteScroll({
    hasMore,
    loading: loadingMore,
    onLoadMore: () => loadRooms(page + 1, true),
  });

  /* ==========================
     Handlers
  ========================== */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      () => alert("Enable location access")
    );
  };

  return (
    <div className="search-page">

      {/* MOBILE FILTER BUTTON */}
      <div className="mobile-filter-btn-wrapper">
        <button
          className="mobile-filter-btn"
          onClick={() => setShowMobileFilters(true)}
        >
          Filters
        </button>
      </div>

      <div className="search-layout">

        {/* DESKTOP SIDEBAR */}
        <div className="desktop-filter">
          <RoomFilterBar
            filters={draftFilters}
            onChange={handleFilterChange}
            onApply={() => applyFilters(draftFilters)}
            onUseLocation={handleUseLocation}
            isPremiumUser={isPremiumUser}
          />
        </div>

        {/* CONTENT AREA */}
        <div className="search-content">

          <div className="results-header">
            <h2>Available Rooms</h2>
            {!initialLoading && (
              <span className="result-count">
                {rooms.length} results
              </span>
            )}
          </div>

          {/* Initial Full Loader */}
          {initialLoading && (
            <MyLoader data="Loading Rooms..." />
          )}

          {/* Empty State */}
          {!initialLoading && rooms.length === 0 && (
            <div className="empty-state">
              No rooms found. Try adjusting your filters.
            </div>
          )}

          {/* Room Grid */}
          {!initialLoading && rooms.length > 0 && (
            <>
              <RoomGrid rooms={rooms} applyFilters={applyFilters} />

              {/* Bottom Loader for Infinite Scroll */}
              {loadingMore && (
                <div className="bottom-loader">
                  <MyLoader data="Loading more rooms..." />
                </div>
              )}

              {!hasMore && (
                <div className="loader">
                  No more rooms
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {showMobileFilters && (
        <div
          className="mobile-filter-overlay"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="mobile-filter-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <RoomFilterBar
              filters={draftFilters}
              onChange={handleFilterChange}
              onApply={() => {
                applyFilters(draftFilters);
                setShowMobileFilters(false);
              }}
              onUseLocation={handleUseLocation}
              isPremiumUser={isPremiumUser}
            />
          </div>
        </div>
      )}

      {/* MAP MODAL */}
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

    </div>
  );
}