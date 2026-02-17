import { Search, Locate } from "lucide-react";
import "../css/roomFilterBar.css"

export default function RoomFilterBar({
  filters,
  onChange,
  onApply,
  onUseLocation,
  isPremiumUser,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
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

        <input
          type="number"
          name="radiusKm"
          placeholder="Radius (km)"
          value={filters.radiusKm || ""}
          onChange={onChange}
        />
      </div>

      <div className="filter-actions">
        <button
          className="btn btn-outline btn-sm"
          onClick={onUseLocation}
          disabled={!isPremiumUser}
          title={
            !isPremiumUser
              ? "Premium required to use location"
              : ""
          }
        >
          <Locate size={16} />
          Use Location
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={onApply}
        >
          <Search size={16} />
          Apply
        </button>
      </div>
    </div>
  );
}
