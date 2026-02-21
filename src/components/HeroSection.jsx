import "../css/hero.css";
import { useNavigate } from "react-router-dom";
import QuickSearchInput from "./QuickSearchInput";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">

        <div className="hero-info">
          <h1 className="hero-title">
            Find Your Perfect <span className="highlight">Room</span>
            <br />
            Anywhere in India
          </h1>

          <p className="hero-desc">
            Explore verified rental homes across 50+ cities.
            Safe. Secure. Hassle-free.
          </p>

          <div className="hero-actions">
            <button
              className="primary-cta"
              onClick={() => navigate("/search")}
            >
              Browse Rooms
            </button>

            <button
              className="secondary-cta"
              onClick={() => navigate("/premium")}
            >
              Explore Premium
            </button>
          </div>
        </div>

        <QuickSearchInput />

      </div>
    </section>
  );
}

export default HeroSection;