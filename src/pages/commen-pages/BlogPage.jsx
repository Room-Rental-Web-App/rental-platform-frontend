import React from "react";
import "../../css/blogPage.css";

const BlogPage = () => {
  return (
    <main className="blog-container">
      {/* SEO H1 */}
      <h1>Find Affordable Rental Rooms Near You – Verified Listings</h1>

      {/* Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
        alt="Affordable rental rooms near me"
        className="blog-hero"
      />

      <p className="intro">
        Finding a rental room shouldn’t be stressful. Our room-rental app helps
        students, working professionals, and families discover verified rental
        rooms without brokers or fake listings.
      </p>

      <section>
        <h2>Why Finding a Rental Room Is Difficult Today</h2>
        <ul>
          <li>High broker commissions</li>
          <li>Fake or outdated listings</li>
          <li>No transparency in pricing</li>
          <li>Wasted time calling owners</li>
        </ul>
        <p>
          People search daily for terms like <strong>rooms for rent near me</strong>,
          <strong> single room for rent</strong>, and
          <strong> budget rooms in city</strong>. This app solves exactly that.
        </p>
      </section>

      <section>
        <h2>How Our Room-Rental App Helps</h2>

        <img
          src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1200&q=80"
          alt="Room rental mobile app interface"
          className="blog-image"
        />

        <ul>
          <li>Verified room listings</li>
          <li>Direct owner contact</li>
          <li>Clear pricing & location</li>
          <li>Filters by city, budget, and room type</li>
        </ul>
      </section>

      <section>
        <h2>Types of Rooms Available</h2>
        <p>Our platform offers:</p>
        <ul>
          <li>Single rooms for rent</li>
          <li>Shared rooms</li>
          <li>PG accommodations</li>
          <li>Rooms for students & professionals</li>
          <li>Short-term and long-term stays</li>
        </ul>
      </section>

      <section>
        <h2>Who Should Use This App?</h2>
        <p>This app is ideal for:</p>
        <ul>
          <li>College students</li>
          <li>IT & office professionals</li>
          <li>People relocating to a new city</li>
          <li>Anyone searching “room for rent near me”</li>
        </ul>
      </section>

      <section>
        <h2>Start Finding Rental Rooms Today</h2>
        <p>
          Skip brokers and fake listings. Find real rooms with real owners.
          Download the app and start your search today.
        </p>
      </section>
    </main>
  );
};

export default BlogPage;
