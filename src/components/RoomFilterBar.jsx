import "../css/roomFilterBar.css";

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

    Object.keys(emptyFilters).forEach((key) => {
      const fakeEvent = {
        target: {
          name: key,
          value: "",
        },
      };
      onChange(fakeEvent);
    });

    onApply();
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
          placeholder="Radius (km)"
          value={filters.radiusKm || ""}
          onChange={onChange}
        />

        <button
          className="btn btn-outline btn-sm"
          onClick={onUseLocation}
          disabled={!isPremiumUser}
        >
          Use My Location
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
        <button
          className="btn btn-primary btn-sm"
          onClick={onApply}
        >
          Apply Filters
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

    </div>
  );
}
