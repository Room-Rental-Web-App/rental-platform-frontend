import "../CSS/hero.css";
import { useNavigate } from "react-router-dom";
import QuickSearchInput from "./QuickSearchInput";

const stats = [
  { value: "50+", label: "Cities" },
  { value: "12K+", label: "Verified Rooms" },
  { value: "4.8★", label: "Avg Rating" },
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Decorative background blobs */}
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-content">
        {/* ── LEFT: Text + CTAs ── */}
        <div className="hero-info">
          {/* Trust pill */}
          <div className="hero-trust-pill">
            <span className="trust-dot" />
            Trusted by renters across India
          </div>

          <h1 className="hero-title">
            Find Your <br />
            Perfect{" "}
            <span className="highlight">
              Room
              <svg className="underline-svg" viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 9.5C50 3 110 2 218 9.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>{" "}
            <br />
            Anywhere in India
          </h1>

          <p className="hero-desc">
            Explore verified rental homes across 50+ cities.
            <br className="hero-br" />
            Safe. Secure. Hassle-free.
          </p>

          <div className="hero-actions">
            <button
              className="primary-cta"
              onClick={() => navigate("/search")}
            >
              <span>Browse Rooms</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            <button
              className="secondary-cta"
              onClick={() => navigate("/premium")}
            >
              ★ Explore Premium
            </button>
          </div>

    
        </div>

        {/* ── RIGHT: Search card ── */}
        <div className="hero-search-card">
          <div className="search-card-header">
            <span className="search-card-icon">🏠</span>
            <div>
              <p className="search-card-title">Find a Room</p>
              <p className="search-card-sub">Search from verified listings</p>
            </div>
          </div>
          <QuickSearchInput />

          {/* Popular tags */}
          <div className="popular-tags">
            <span className="tags-label">Popular:</span>
            {["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad"].map((city) => (
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