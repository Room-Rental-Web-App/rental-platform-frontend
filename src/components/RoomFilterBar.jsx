// RoomFilterBar.js - Google Maps version
// Kya badla:
// - "Use My Location" button ab Google Maps Geocoding API se
//   user ki current lat/lng ko proper address mein convert karta hai
// - onUseLocation callback mein ab { lat, lng, city, pincode } pass hoga
//   (parent component mein onUseLocation update karna hoga accordingly)

import "../CSS/roomFilterBar.css";

export default function RoomFilterBar({
  filters,
  onChange,
  onApply,
  onUseLocation,
  isPremiumUser,
}) {
  const handleReset = () => {
    const emptyFilters = {
      city: "",
      pincode: "",
      roomType: "",
      minPrice: "",
      maxPrice: "",
      radiusKm: "",
    };

    // ✅ Pehle draftFilters UI clear karo
    Object.keys(emptyFilters).forEach((key) => {
      onChange({ target: { name: key, value: "" } });
    });

    // ✅ Directly empty filters pass karo — async state ka wait nahi
    onApply(emptyFilters, null);
  };

  // ✅ Google Maps Geocoding se current location ka city + pincode nikalo
  // ✅ Ye wala handleUseMyLocation replace karo
  const handleUseMyLocation = () => {
    if (!isPremiumUser) {
      alert("This feature is available only for Premium users.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // ✅ importLibrary use karo — purana new Geocoder() nahi chalega
          const { Geocoder } =
            await window.google.maps.importLibrary("geocoding");
          const geocoder = new Geocoder();

          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status !== "OK" || !results[0]) {
              onUseLocation({ lat, lng, city: "", pincode: "" });
              return;
            }

            const components = results[0].address_components;

            const cityComp =
              components.find((c) => c.types.includes("locality")) ||
              components.find((c) =>
                c.types.includes("administrative_area_level_2"),
              );

            const pincodeComp = components.find((c) =>
              c.types.includes("postal_code"),
            );

            const city = cityComp ? cityComp.long_name : "";
            const pincode = pincodeComp ? pincodeComp.long_name : "";

            onUseLocation({ lat, lng, city, pincode });

            if (city) onChange({ target: { name: "city", value: city } });
            if (pincode)
              onChange({ target: { name: "pincode", value: pincode } });
          });
        } catch (err) {
          console.error("Geocoding error:", err);
          onUseLocation({ lat, lng, city: "", pincode: "" });
        }
      },
      (error) => {
        console.error("Location error:", error);
        alert("Location access denied. Please allow location permission.");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 },
    );
  };
  return (
    <div className="filter-wrapper">
      <h3 className="filter-title">Filters</h3>

      {/* LOCATION */}
      <div className="filter-section">
        <span className="section-label">Location</span>

        <input
          name="city"
          placeholder="City"
          value={filters.city || ""}
          onChange={onChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={filters.pincode || ""}
          onChange={onChange}
        />

        <input
          type="number"
          name="radiusKm"
          className={`radius-input ${!isPremiumUser ? "locked" : ""}`}
          placeholder="Radius (km)"
          value={filters.radiusKm || ""}
          onChange={(e) => {
            if (!isPremiumUser) {
              alert("Radius filter is available only for Premium users.");
              return;
            }
            onChange(e);
          }}
        />

        {/* ✅ Google Maps Geocoding wala button */}
        <button
          className="btn btn-outline btn-sm"
          onClick={handleUseMyLocation}
        >
          📍 Use My Location
        </button>
      </div>

      {/* ROOM TYPE */}
      <div className="filter-section">
        <span className="section-label">Room Type</span>

        <select
          name="roomType"
          value={filters.roomType || ""}
          onChange={onChange}
        >
          <option value="">All Types</option>
          <option value="Single Room">Single Room</option>
          <option value="Double Room">Double Room</option>
          <option value="PG">PG</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      {/* PRICE */}
      <div className="filter-section">
        <span className="section-label">Price Range</span>

        <input
          type="number"
          name="minPrice"
          placeholder="Min ₹"
          value={filters.minPrice || ""}
          onChange={onChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max ₹"
          value={filters.maxPrice || ""}
          onChange={onChange}
        />
      </div>

      {/* ACTIONS */}
      <div className="filter-actions">
        <button className="btn btn-primary btn-sm" onClick={onApply}>
          Apply Filters
        </button>

        <button className="btn btn-ghost btn-sm" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
