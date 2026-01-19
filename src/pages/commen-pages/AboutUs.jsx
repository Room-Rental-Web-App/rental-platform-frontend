import React from "react";
import { Target, Eye, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import "../../css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="hero-title">
          Redefining the Way <span className="highlight">India Rents</span>
        </h1>
        <p className="hero-subtitle">
          Making your journey from searching to moving in seamless, transparent,
          and hassle-free.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="mission-vision-grid">
        <div className="info-card">
          <div className="card-icon">
            <Target size={32} />
          </div>
          <h3>Our Mission</h3>
          <p>
            To empower every renter in India with a transparent platform that
            eliminates brokerage and builds direct trust between owners and
            tenants.
          </p>
        </div>
        <div className="info-card">
          <div className="card-icon">
            <Eye size={32} />
          </div>
          <h3>Our Vision</h3>
          <p>
            To become India's most trusted real estate ecosystem where finding a
            home is as easy as ordering a meal through smart technology.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values">
        <h2 className="section-title">
          Why Choose <span className="highlight">RoomsDekho</span>?
        </h2>
        <div className="values-grid">
          <div className="value-item">
            <Zap className="primary-icon" />
            <h4>Zero Brokerage</h4>
            <p>
              Your hard-earned money belongs to you. We provide a platform with
              no hidden costs.
            </p>
          </div>
          <div className="value-item">
            <ShieldCheck className="primary-icon" />
            <h4>Verified Listings</h4>
            <p>
              Every room is manually checked to ensure that what you see is
              exactly what you get.
            </p>
          </div>
          <div className="value-item">
            <HeartHandshake className="primary-icon" />
            <h4>Direct Connection</h4>
            <p>
              We facilitate direct communication between owners and renters for
              better transparency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
