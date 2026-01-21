import React from "react";
import "../../css/home.css"; // Overall Home Page CSS

// Components for different sections
import HeroSection from "../../components/HeroSection";
import CategorySection from "../../components/CategorySection";
import FeaturedProperties from "../../components/FeaturedProperties"; // New Component
import TestimonialSection from "../../components/TestimonialSection"; // New Component
import OwnerCTA from "../../components/OwnerCTA"; // New Component

export default function RoomsDekhoHomepage() {
  return (
    <div className="roomsdekho-homepage">
      {/* 1. Top Section: Hero Image with Search Bar */}
      <HeroSection />

      {/* 2. Middle Section: Property Categories */}
      <CategorySection />

      {/* 3. Featured Listings */}
      <section className="featured-section-wrapper">
        <div className="section-header">
          <h2>Featured Properties</h2>
          <p>Handpicked rooms for your comfortable stay</p>
        </div>
        <FeaturedProperties />
      </section>

      {/* 4. Testimonials (What Our Renters Say) */}
      <TestimonialSection />

      {/* 5. Call to Action for Property Owners */}
      <OwnerCTA />
    </div>
  );
}
