import React, { useState } from "react";
import { Search, MapPin, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategorySection from "./CategorySection";
import FeaturedProperties from "./FeaturedProperties";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../../CSS/home.css";

function HomeSec() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("");

  // LocalStorage se data nikaalo check karne ke liye
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // User ka role (USER ya OWNER)

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?city=${searchQuery}&roomType=${propertyType}`);
  };

  const handleOwnerAction = () => {
    if (!token) {
      // Agar login nahi hai, toh registration/login pe bhejo
      navigate("/login");
    } else {
      // Agar owner hai toh add room pe
      navigate("/add-room");
    }
  };

  return (
    <div className="roomsdekho-home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Unlock Your Perfect Space.</h1>
          <p className="hero-subtitle">
            Find your ideal room with zero brokerage.
          </p>

          <form className="search-bar-container" onSubmit={handleSearch}>
            <div className="search-input-group">
              <MapPin size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Enter City..."
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
                <option value="Single Room">Single Room</option>
                <option value="Shared PG">Shared PG</option>
                <option value="Flat">Full Flat</option>
              </select>
            </div>
            <button type="submit" className="search-button">
              <Search size={20} /> <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      <CategorySection />

      <section className="featured-section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
        </div>
        <FeaturedProperties />
      </section>

      {/* --- UPDATED OWNER CTA LOGIC --- */}
      {/* Yahan check ho raha hai:
          1. Agar token nahi hai (Logged out) -> SHOW (Taaki naya owner aaye)
          2. Agar token hai aur role 'OWNER' hai -> SHOW
          3. Agar token hai aur role 'USER' hai -> HIDE (Section gayab ho jayega)
      */}
      {(!token || userRole === "OWNER") && (
        <section className="owner-cta-section">
          <div className="owner-cta-content">
            <h2>Got a Property to List? Post it for FREE!</h2>
          </div>
          <button className="owner-cta-button" onClick={handleOwnerAction}>
            Add Your Property
          </button>
        </section>
      )}
    </div>
  );
}

export default HomeSec;
