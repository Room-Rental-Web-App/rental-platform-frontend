import React, { useState } from "react";
import {
  BookOpen,
  AlertTriangle,
  Smartphone,
  Home,
  Users,
  CheckCircle2,
  ArrowRight,
  Search,
  BadgeCheck,
  PhoneCall,
  SlidersHorizontal,
  MapPin,
} from "lucide-react";
import "../../CSS/utils/theme.css";
import "../../CSS/blogPage.css";

const problems = [
  { icon: <BadgeCheck size={20} />, text: "High broker commissions" },
  { icon: <AlertTriangle size={20} />, text: "Fake or outdated listings" },
  { icon: <Search size={20} />, text: "No transparency in pricing" },
  { icon: <PhoneCall size={20} />, text: "Wasted time calling owners" },
];

const solutions = [
  { icon: <BadgeCheck size={20} />, text: "Verified room listings" },
  { icon: <PhoneCall size={20} />, text: "Direct owner contact" },
  { icon: <MapPin size={20} />, text: "Clear pricing & location" },
  {
    icon: <SlidersHorizontal size={20} />,
    text: "Filters by city, budget & room type",
  },
];

const roomTypes = [
  "Single rooms for rent",
  "Shared rooms",
  "PG accommodations",
  "Rooms for students & professionals",
  "Short-term and long-term stays",
];

const audiences = [
  {
    icon: <BookOpen size={20} />,
    label: "College Students",
    desc: "Find affordable rooms near your campus.",
  },
  {
    icon: <Smartphone size={20} />,
    label: "IT & Office Professionals",
    desc: "Comfortable stays near your workplace.",
  },
  {
    icon: <MapPin size={20} />,
    label: "People Relocating",
    desc: "Discover verified rooms in your new city.",
  },
  {
    icon: <Search size={20} />,
    label: "Anyone Searching Online",
    desc: "Skip brokers, find rooms directly.",
  },
];

const BlogPage = () => {
  return (
    <main className="blog-page">
      {/* ===== HERO ===== */}
      <section className="blog-hero-section">
        <div className="blog-hero-content">
          <div className="blog-badge">
            <BookOpen size={13} /> Room Rental Guide
          </div>
          <h1>
            Find Affordable Rental Rooms{" "}
            <span className="blog-highlight">Near You</span>
          </h1>
          <p className="blog-intro">
            Finding a rental room shouldn't be stressful. Our platform helps
            students, professionals, and families discover verified rental rooms
            — without brokers or fake listings.
          </p>
          <a href="/rooms" className="blog-cta-btn">
            Browse Rooms <ArrowRight size={16} />
          </a>
        </div>
        <div className="blog-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
            alt="Affordable rental rooms near me"
          />
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="blog-section">
        <div className="blog-section-label">
          <AlertTriangle size={13} /> The Problem
        </div>
        <h2>Why Finding a Rental Room Is Difficult Today</h2>
        <div className="blog-cards-grid">
          {problems.map((item, i) => (
            <div className="blog-problem-card" key={i}>
              <span className="blog-problem-icon">{item.icon}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="blog-keyword-box">
          <p>
            People search daily for terms like{" "}
            <strong>rooms for rent near me</strong>,{" "}
            <strong>single room for rent</strong>, and{" "}
            <strong>budget rooms in city</strong>. This app solves exactly that.
          </p>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section className="blog-section blog-split-section">
        <div className="blog-split-text">
          <div className="blog-section-label">
            <Smartphone size={13} /> Our Solution
          </div>
          <h2>How Our Room-Rental App Helps</h2>
          <ul className="blog-check-list">
            {solutions.map((item, i) => (
              <li key={i}>
                <span className="blog-check-icon">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="blog-split-img">
          <img
            src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=900&q=80"
            alt="Room rental mobile app interface"
          />
        </div>
      </section>

      {/* ===== ROOM TYPES ===== */}
      <section className="blog-section">
        <div className="blog-section-label">
          <Home size={13} /> What We Offer
        </div>
        <h2>Types of Rooms Available</h2>
        <div className="blog-room-types">
          {roomTypes.map((type, i) => (
            <div className="blog-room-chip" key={i}>
              <CheckCircle2 size={15} /> {type}
            </div>
          ))}
        </div>
      </section>

      {/* ===== AUDIENCE ===== */}
      <section className="blog-section">
        <div className="blog-section-label">
          <Users size={13} /> Who It's For
        </div>
        <h2>Who Should Use This App?</h2>
        <div className="blog-audience-grid">
          {audiences.map((item, i) => (
            <div className="blog-audience-card" key={i}>
              <span className="blog-audience-icon">{item.icon}</span>
              <div>
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section className="blog-cta-section">
        <div className="blog-cta-card">
          <h2>Start Finding Rental Rooms Today</h2>
          <p>
            Skip brokers and fake listings. Find real rooms with real owners —
            right now.
          </p>
          <a href="/rooms" className="blog-cta-btn">
            Find a Room <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
