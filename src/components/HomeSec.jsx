import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  MapPin,
  Star,
  Bed,
  Bath,
  Square,
  Building2,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api.jsx"; // Aapka Axios/Fetch instance
import "../../css/home.css";

function HomeSec() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]); // Real data state
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // Backend se Properties fetch karna
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Aapka endpoint jo saare rooms return karta hai
        const response = await Api.get("/properties/all");
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Backend fetch error:", error);
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Backend search endpoint par bhejenge
    navigate(`/search?city=${searchQuery}&type=${propertyType}`);
  };

  return (
    <div className="roomsdekho-home-container">
      {/* HERO SECTION - Exact Image Design */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Unlock Your Perfect Space.</h1>
          <p className="hero-subtitle">
            Find your ideal room, PG, or flat with zero brokerage.
          </p>

          <form className="search-bar-container" onSubmit={handleSearch}>
            <div className="search-input-group">
              <MapPin size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Location (Hitech City, Gachibowli...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="search-input-group">
              <Building2 size={20} className="input-icon" />
              <select
                className="search-select-input"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Room Type</option>
                <option value="PG">Shared PG</option>
                <option value="FLAT">Full Flat</option>
                <option value="ROOM">Single Room</option>
              </select>
            </div>
            <button type="submit" className="search-button">
              <Search size={20} /> <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* FEATURED PROPERTIES - Dynamic Backend Data */}
      <section className="featured-section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">
            Real-time listings from our verified owners
          </p>
        </div>

        {loading ? (
          <div className="loader">Loading properties...</div>
        ) : (
          <div className="featured-properties-grid">
            {properties.slice(0, 6).map((property) => (
              <div
                key={property.id}
                className="property-card"
                onClick={() => navigate(`/room/${property.id}`)}
              >
                <div className="property-image-container">
                  {/* Backend se image URL aa raha hoga */}
                  <img
                    src={property.imageUrl || "placeholder.jpg"}
                    alt={property.title}
                    className="property-image"
                  />
                  <span className="verified-badge">Verified</span>
                  <button
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation(); /* Wishlist logic */
                    }}
                  >
                    <Heart size={18} />
                  </button>
                </div>
                <div className="property-details">
                  <p className="property-price-main">
                    ₹{property.price}
                    <span className="price-label">/month</span>
                  </p>
                  <h3 className="property-title-text">{property.title}</h3>
                  <p className="property-location-text">
                    <MapPin size={14} /> {property.address}
                  </p>
                  <div className="property-amenities-row">
                    <span>
                      <Bed size={14} /> {property.beds} Beds
                    </span>
                    <span>
                      <Bath size={14} /> {property.baths} Bath
                    </span>
                    <span>
                      <Square size={14} /> {property.sqft} sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* OWNER CTA */}
      <section className="owner-cta-section">
        <div className="owner-cta-content">
          <h2>Got a Property to List? Post it for FREE!</h2>
        </div>
        <button
          className="owner-cta-button"
          onClick={() => navigate("/add-property")}
        >
          Add Your Property
        </button>
      </section>
    </div>
  );
}

export default HomeSec;
