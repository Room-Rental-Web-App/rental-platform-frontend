import React from "react";
import "../../css/faqs.css";

function Faqs() {
  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <p className="faq-subtitle">
        Clear answers to common questions about rooms, bookings, payments, and support.
      </p>

      {/* GENERAL */}
      <section>
        <h2>General</h2>

        <div className="faq-item">
          <h3>What is this platform?</h3>
          <p>
            This is a room-rental platform that helps users find verified rooms
            directly from owners without brokers or hidden charges.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is this platform free to use?</h3>
          <p>
            Yes. Searching and viewing room listings is free. Any paid services
            are clearly mentioned before you proceed.
          </p>
        </div>
      </section>

      {/* ROOMS */}
      <section>
        <h2>Rooms & Listings</h2>

        <div className="faq-item">
          <h3>How do I find rooms near me?</h3>
          <p>
            Use filters like city, area, budget, and room type to find rooms near
            your location.
          </p>
        </div>

        <div className="faq-item">
          <h3>Are all room listings verified?</h3>
          <p>
            We actively monitor listings, but users should always verify details
            like rent, rules, and availability with the owner before booking.
          </p>
        </div>

        <div className="faq-item">
          <h3>What should I do if I find a fake listing?</h3>
          <p>
            Report the listing immediately using the Contact Support page. Fake
            listings are taken seriously.
          </p>
        </div>
      </section>

      {/* BOOKING */}
      <section>
        <h2>Booking & Payments</h2>

        <div className="faq-item">
          <h3>How do I book a room?</h3>
          <p>
            Contact the room owner directly through the app and finalize the
            terms. Booking processes may vary by owner.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is online payment mandatory?</h3>
          <p>
            No. Payment methods depend on the owner. Any platform charges (if
            applicable) are shown clearly.
          </p>
        </div>

        <div className="faq-item">
          <h3>What if I face a payment issue?</h3>
          <p>
            Raise a support ticket with the issue type “Payment” and include all
            relevant details.
          </p>
        </div>
      </section>

      {/* ACCOUNT */}
      <section>
        <h2>Account & Security</h2>

        <div className="faq-item">
          <h3>Do I need an account to use the app?</h3>
          <p>
            You can browse listings without an account, but contacting owners
            and raising support requests requires login.
          </p>
        </div>

        <div className="faq-item">
          <h3>Is my personal data safe?</h3>
          <p>
            Yes. We do not sell user data. Your information is used only to
            provide services and support.
          </p>
        </div>
      </section>

      {/* SUPPORT */}
      <section>
        <h2>Support</h2>

        <div className="faq-item">
          <h3>How do I contact support?</h3>
          <p>
            Go to the Contact Support page, submit your issue, and track its
            status from “My Support Requests”.
          </p>
        </div>

        <div className="faq-item">
          <h3>How long does support take to respond?</h3>
          <p>
            High-urgency issues are prioritized. Most queries are addressed
            within 24–48 hours.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Faqs;
