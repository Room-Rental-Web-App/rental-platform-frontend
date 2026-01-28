import React from "react";
import "../../css/careerPage.css";

const CareerPage = () => {
  return (
    <main className="career-container">
      {/* H1 for SEO */}
      <h1>Careers at RentRoom – Build Products That Solve Real Problems</h1>

      {/* Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
        alt="Startup team working together"
        className="career-hero"
      />

      <p className="intro">
        We’re building a room-rental platform that removes brokers, fake
        listings, and wasted time. If you want comfort, corporate perks, or
        spoon-feeding — this is not for you.
      </p>

      <section>
        <h2>Why Work With Us?</h2>
        <ul>
          <li>Real-world problems, not demo projects</li>
          <li>Direct impact on users’ daily lives</li>
          <li>Fast execution, minimal meetings</li>
          <li>Ownership over features, not just tasks</li>
        </ul>
      </section>

      <section>
        <h2>Open Positions</h2>

        <div className="job-card">
          <h3>Frontend Developer (React)</h3>
          <p>
            You’ll build user-facing features like room listings, search,
            filters, and dashboards.
          </p>
          <ul>
            <li>Strong React fundamentals</li>
            <li>Clean HTML, CSS, JavaScript</li>
            <li>Experience with REST APIs</li>
          </ul>
        </div>

        <div className="job-card">
          <h3>Backend Developer (Java / Spring)</h3>
          <p>
            You’ll work on APIs, authentication, payments, and data reliability.
          </p>
          <ul>
            <li>Java + Spring Boot</li>
            <li>JPA / MySQL knowledge</li>
            <li>API design & security basics</li>
          </ul>
        </div>

        <div className="job-card">
          <h3>Operations & Field Executive</h3>
          <p>
            You’ll verify rooms, coordinate with owners, and ensure listing
            accuracy.
          </p>
          <ul>
            <li>Good communication skills</li>
            <li>Comfortable with field work</li>
            <li>Basic smartphone usage</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>What We Expect (No Sugarcoating)</h2>
        <ul>
          <li>You take responsibility — no excuses</li>
          <li>You learn fast and adapt faster</li>
          <li>You don’t wait to be told everything</li>
          <li>You care about users, not just salary</li>
        </ul>
      </section>

      {/* Culture Image */}
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        alt="Startup work culture"
        className="career-image"
      />

      <section>
        <h2>How to Apply</h2>
        <p>
          Send your resume and a short intro explaining why you want to work on a
          room-rental product (not just “I need a job”).
        </p>
        <p className="apply-note">
          Email: <strong>careers@yourappname.com</strong>
        </p>
      </section>
    </main>
  );
};

export default CareerPage;
