import "../CSS/hero.css";
import QuickSearchInput from "./QuickSearchInput";


function HeroSection() {

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-info">
          <h1 className="hero-title">
            Find Your Perfect <span className="highlight">Room</span><br />
            Anywhere in India
          </h1>

          <p className="hero-desc">
            Discover thousands of verified rental properties across 50+ cities.
            Your dream home is just a search away.
          </p>
        </div>
      </div>
      <QuickSearchInput />
    </section>
  );
}

export default HeroSection;
