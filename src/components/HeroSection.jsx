import "../CSS/hero.css";
import { useNavigate } from "react-router-dom";
import QuickSearchInput from "./QuickSearchInput";
import { HomeShow } from "../data/roomsDekhoData";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-info">
          <div className="hero-trust-pill">
            <span className="trust-dot" />
            Trusted by renters across India
          </div>

          <h1 className="hero-title">
            Find Your <br />
            Perfect <span className="highlight">Room</span> <br />
            Anywhere in India
          </h1>

          <p className="hero-desc">
            Explore verified rental homes across 50+ cities.
          </p>

          <div className="hero-actions">
            <button className="primary-cta" onClick={() => navigate("/search")}>
              <span>Browse Rooms</span>
            </button>
          </div>
        </div>

        {/* --- SEARCH CARD --- */}
        <div className="hero-search-card">
          <div className="search-card-header">
            <span className="search-card-icon">🏠</span>
            <div>
              <p className="search-card-title">Find a Room</p>
              <p className="search-card-sub">Search from verified listings</p>
            </div>
          </div>

          {/* Wrapper jo dropdown ko handle karega */}
          <div className="search-input-parent-wrapper">
            <QuickSearchInput />
          </div>

          <div className="popular-tags">
            <span className="tags-label">Popular:</span>
            {HomeShow &&
              HomeShow.map((city) => (
                <button
                  key={city}
                  className="city-tag"
                  onClick={() => navigate(`/search?city=${city}`)}
                >
                  {city}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
