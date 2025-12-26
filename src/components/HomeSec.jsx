import React, { useState } from 'react'
import { Search, Home, MapPin, Star, ArrowRight, Bed, Bath, Square, Navigation } from 'lucide-react';
import { cities, propertyTypes, featuredProperties, features, testimonials, cities_popular, stats, howItWorks } from "../data/roomsDekhoData.js"
function HomeSec() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Logical search implementation
        console.log("Searching...", { selectedCity, propertyType, searchQuery });
    };

    return (
        <>

            <div className="search-wrapper">
                <form className="search-card" onSubmit={handleSearch}>
                    <div className="search-grid">
                        {/* City Picker */}
                        <div className="search-group">
                            <label className="search-label">
                                <MapPin size={16} /> City
                            </label>
                            <select
                                className="search-select"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Property Type */}
                        <div className="search-group">
                            <label className="search-label">
                                <Home size={16} /> Type
                            </label>
                            <select
                                className="search-select"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                {propertyTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location Input */}
                        <div className="search-group">
                            <label className="search-label">
                                <Navigation size={16} /> Location
                            </label>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Area or Landmark"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="hero-search-btn">
                            <Search size={20} />
                            <span>Find Rooms</span>
                        </button>
                    </div>
                </form>
            </div>

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


        </>
    )
}

export default HomeSec