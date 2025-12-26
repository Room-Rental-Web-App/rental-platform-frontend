import React, { useState } from 'react';
import { Search, Home, MapPin, Shield, Star, TrendingUp, Clock, Users, CheckCircle, ArrowRight, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Bed, Bath, Square, Lock, LogIn, AlertCircle, UserCircle, ShieldCheck, X } from 'lucide-react';

import { cities, propertyTypes, featuredProperties, features, testimonials, cities_popular, stats, howItWorks } from "../data/roomsDekhoData.js"
import "../css/home.css"

export default function RoomsDekhoHomepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="container">

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Find Your Perfect <span className="highlight">Room</span><br />
          Anywhere in India
        </h1>
        <p className="hero-desc">
          Discover thousands of verified rental properties across 50+ cities in India. Your dream home is just a search away with our trusted platform.
        </p>


      </section>
      <section>
        {/* Search Box */}
        <div className="search-container">
          <div className="search-form">
            <div className="form-group">
              <label className="label">Select City</label>
              <select
                className="input"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Choose a city</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Property Type</label>
              <select
                className="input"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Search Location</label>
              <input
                type="text"
                className="input"
                placeholder="Area, locality, landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-search">
              <Search size={20} />
              Search
            </button>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose RoomsDekho?</h2>
        <p className="section-subtitle">
          We provide end-to-end solutions for all your rental needs with a commitment to transparency and customer satisfaction
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <feature.icon className="feature-icon" />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="how-it-works-title">How It Works</h2>
        <div className="steps-grid">
          {howItWorks.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.step}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="properties-section">
        <h2 className="section-title">Featured Properties</h2>
        <p className="section-subtitle">
          Handpicked premium properties that match your lifestyle and budget
        </p>

        <div className="filter-bar">
          <button
            className={`filter-btn ${selectedFilter === 'all' ? 'filter-btn-active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All Properties
          </button>
          {propertyTypes.map(type => (
            <button
              key={type}
              className={`filter-btn ${selectedFilter === type ? 'filter-btn-active' : ''}`}
              onClick={() => setSelectedFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="properties-grid">
          {featuredProperties
            .filter(prop => selectedFilter === 'all' || prop.type === selectedFilter)
            .map(property => (
              <div key={property.id} className="property-card">
                <img src={property.image} alt={property.title} className="property-image" />
                <div className="property-content">
                  <h3 className="property-title">{property.title}</h3>
                  <div className="property-location">
                    <MapPin size={16} />
                    <span>{property.location}</span>
                  </div>
                  <div className="property-details">
                    <div className="property-detail">
                      <Bed size={16} />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="property-detail">
                      <Bath size={16} />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="property-detail">
                      <Square size={16} />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  <div className="property-footer">
                    <div>
                      <div className="property-price">{property.price}</div>
                      <div className="property-price-label">per month</div>
                    </div>
                    <div className="property-rating">
                      <Star size={18} fill="#fbbf24" />
                      <span>{property.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="cities-section">
        <h2 className="section-title">Popular Cities</h2>
        <p className="section-subtitle">
          Explore rental properties in India's most vibrant cities
        </p>
        <div className="cities-grid">
          {cities_popular.map((city, index) => (
            <div key={index} className="city-card">
              <img src={city.image} alt={city.name} className="city-image" />
              <div className="city-overlay">
                <div className="city-name">{city.name}</div>
                <div className="city-properties">{city.properties} Properties</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it - hear from thousands of happy renters
        </p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div className="testimonial-info">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role} • {testimonial.city}</div>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Find Your Dream Home?</h2>
        <p className="cta-desc">
          Join thousands of happy renters who found their perfect home through RoomsDekho
        </p>
        <div className="cta-buttons">
          <button className="btn-white">
            Browse Properties
            <ArrowRight size={20} />
          </button>
          <button className="btn-white-outline">
            List Your Property
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <Home size={32} />
              <span>RoomsDekho</span>
            </div>
            <p className="footer-text">
              Your trusted partner in finding the perfect rental home across India. We make renting simple, safe, and hassle-free.
            </p>
            <div className="social-icons">
              <div className="social-icon">
                <Facebook size={20} />
              </div>
              <div className="social-icon">
                <Twitter size={20} />
              </div>
              <div className="social-icon">
                <Instagram size={20} />
              </div>
              <div className="social-icon">
                <Linkedin size={20} />
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <a className="footer-link">About Us</a>
              <a className="footer-link">Properties</a>
              <a className="footer-link">Blog</a>
              <a className="footer-link">Career</a>
              <a className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <div className="footer-links">
              <a className="footer-link">Help Center</a>
              <a className="footer-link">FAQs</a>
              <a className="footer-link">Terms of Service</a>
              <a className="footer-link">Privacy Policy</a>
              <a className="footer-link">Refund Policy</a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-links">
              <a className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} />
                +91 98765 43210
              </a>
              <a className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} />
                info@roomsdekho.com
              </a>
              <a className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} />
                Mumbai, Maharashtra
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 RoomsDekho. All rights reserved. | Designed with ❤️ for renters across India</p>
        </div>
      </footer>
    </div>
  );
}