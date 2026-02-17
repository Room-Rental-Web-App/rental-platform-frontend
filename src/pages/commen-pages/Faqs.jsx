import React, { useState } from "react";
import {
  HelpCircle,
  Home,
  CreditCard,
  UserCircle,
  HeadphonesIcon,
  ChevronDown,
  Search,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import "../../css/faqs.css";

const faqData = [
  {
    category: "General",
    icon: <HelpCircle size={18} />,
    items: [
      {
        q: "What is RoomsDekho?",
        a: "RoomsDekho is a zero-brokerage room-rental platform that helps users find verified rooms directly from owners — no middlemen, no hidden charges.",
      },
      {
        q: "Is this platform free to use?",
        a: "Yes. Searching and viewing room listings is completely free. Any paid premium services are clearly mentioned before you proceed.",
      },
      {
        q: "Is RoomsDekho available across India?",
        a: "We're expanding rapidly. Currently we cover major cities and towns. Use the search bar to check availability in your area.",
      },
    ],
  },
  {
    category: "Rooms & Listings",
    icon: <Home size={18} />,
    items: [
      {
        q: "How do I find rooms near me?",
        a: "Use filters like city, area, budget, and room type on the search page to find rooms close to your location.",
      },
      {
        q: "Are all room listings verified?",
        a: "We actively monitor listings, but users should always verify details like rent, rules, and availability directly with the owner before finalising.",
      },
      {
        q: "What should I do if I find a fake listing?",
        a: "Report the listing immediately using the 'Report' button on the listing page or contact us via the Support page. Fake listings are investigated within 24 hours.",
      },
      {
        q: "Can I list my property on RoomsDekho?",
        a: "Absolutely. Register as an owner, complete your profile, and post your listing for free. Our team reviews submissions before they go live.",
      },
    ],
  },
  {
    category: "Booking & Payments",
    icon: <CreditCard size={18} />,
    items: [
      {
        q: "How do I book a room?",
        a: "Contact the room owner directly through the app and finalise terms with them. Booking processes may vary by owner — always confirm before making any payment.",
      },
      {
        q: "Is online payment mandatory?",
        a: "No. Payment methods depend on the individual owner. Any platform charges (if applicable) are shown clearly before you proceed.",
      },
      {
        q: "What if I face a payment issue?",
        a: "Raise a support ticket with issue type 'Payment' and include your transaction ID and a brief description. We'll get back to you within 24–48 hours.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: <UserCircle size={18} />,
    items: [
      {
        q: "Do I need an account to use the app?",
        a: "You can browse listings without an account. However, contacting owners, saving listings, and raising support requests require you to be logged in.",
      },
      {
        q: "Is my personal data safe?",
        a: "Yes. We do not sell your data to third parties. Your information is used solely to provide and improve our services. Read our Privacy Policy for full details.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Account Settings → Privacy → Delete Account. Your data will be permanently removed within 30 days as per our data retention policy.",
      },
    ],
  },
  {
    category: "Support",
    icon: <HeadphonesIcon size={18} />,
    items: [
      {
        q: "How do I contact support?",
        a: "Visit the Contact Support page, submit your issue with relevant details, and track its status from 'My Support Requests'.",
      },
      {
        q: "How long does support take to respond?",
        a: "High-urgency issues are prioritised. Most queries are addressed within 24–48 hours on working days.",
      },
      {
        q: "Can I chat with support directly?",
        a: "Yes. Use the in-app chat feature available in the Support section for real-time assistance during business hours.",
      },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-accordion-item${isOpen ? " open" : ""}`}>
      <button className="faq-accordion-trigger" onClick={onToggle}>
        <span className="faq-question-text">{q}</span>
        <span className="faq-chevron">
          <ChevronDown size={18} />
        </span>
      </button>
      <div className="faq-accordion-body">
        <p>{a}</p>
      </div>
    </div>
  );
}

function Faqs() {
  const [openMap, setOpenMap] = useState({ "0-0": true });

  const toggle = (key) =>
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="faq-page">
      {/* ── Hero ── */}
      <section className="faq-hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Help Center
        </div>
        <h1>
          Frequently Asked <span className="highlight">Questions</span>
        </h1>
        <p className="faq-subtitle">
          Clear answers to common questions about rooms, bookings, payments, and
          support.
        </p>
        <div className="hero-meta">
          <span>
            {faqData.reduce((a, c) => a + c.items.length, 0)} Questions
          </span>
          <span className="meta-divider" />
          <span>{faqData.length} Categories</span>
          <span className="meta-divider" />
          <span>Always Updated</span>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="faq-body">
        {/* Contact strip */}
        <div className="faq-contact-strip">
          <div className="faq-contact-strip-left">
            <MessageSquare size={18} />
            <span>Can't find your answer?</span>
          </div>
          <div className="faq-contact-strip-right">
            <div className="contact-item">
              <ShieldCheck size={14} />
              <span>support@roomsdekho.com</span>
            </div>
            <div className="contact-item">
              <HeadphonesIcon size={14} />
              <span>24–48 hr response</span>
            </div>
          </div>
        </div>

        {/* ── Categories ── */}
        {faqData.map((cat, ci) => (
          <div
            key={ci}
            className="faq-category"
            style={{ animationDelay: `${ci * 80}ms` }}
          >
            <div className="faq-category-header">
              <div className="faq-category-icon">{cat.icon}</div>
              <h2>{cat.category}</h2>
              <span className="faq-category-count">{cat.items.length}</span>
            </div>
            <div className="faq-accordion">
              {cat.items.map((item, qi) => {
                const key = `${ci}-${qi}`;
                return (
                  <AccordionItem
                    key={key}
                    q={item.q}
                    a={item.a}
                    isOpen={!!openMap[key]}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="legal-footer">
        <p>
          © 2026 RoomsDekho · Still have questions? Reach us at{" "}
          <strong>support@roomsdekho.com</strong>
        </p>
      </footer>
    </div>
  );
}

export default Faqs;
