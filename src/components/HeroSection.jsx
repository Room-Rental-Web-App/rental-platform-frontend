import Login from "./Auth";
import "../css/hero.css";
import { useEffect, useState } from "react";

function HeroSection() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = () => {
     setToken(localStorage.getItem("token"));
     window.location.reload();
  };

  useEffect(() => {
  }, [token]);       

  return (
    <section className="hero">
      <div className="hero-container">
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

          {!token && <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
