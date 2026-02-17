import React, { useState, useMemo } from "react";
import {
  Search,
  HelpCircle,
  Home,
  CreditCard,
  UserCircle,
  Headphones,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import "../../CSS/utils/theme.css";
import "../../CSS/Faqs.css";

const faqData = [
  {
    category: "General",
    icon: <HelpCircle size={18} />,
    items: [
      {
        q: "What is this platform?",
        a: "This is a room-rental platform that helps users find verified rooms directly from owners without brokers or hidden charges.",
      },
      {
        q: "Is this platform free to use?",
        a: "Yes. Searching and viewing room listings is free. Any paid services are clearly mentioned before you proceed.",
      },
    ],
  },
  {
    category: "Rooms & Listings",
    icon: <Home size={18} />,
    items: [
      {
        q: "How do I find rooms near me?",
        a: "Use filters like city, area, budget, and room type to find rooms near your location.",
      },
      {
        q: "Are all room listings verified?",
        a: "We actively monitor listings, but users should always verify details like rent, rules, and availability with the owner before booking.",
      },
      {
        q: "What should I do if I find a fake listing?",
        a: "Report the listing immediately using the Contact Support page. Fake listings are taken seriously.",
      },
    ],
  },
  {
    category: "Booking & Payments",
    icon: <CreditCard size={18} />,
    items: [
      {
        q: "How do I book a room?",
        a: "Contact the room owner directly through the app and finalize the terms. Booking processes may vary by owner.",
      },
      {
        q: "Is online payment mandatory?",
        a: "No. Payment methods depend on the owner. Any platform charges (if applicable) are shown clearly.",
      },
      {
        q: "What if I face a payment issue?",
        a: "Raise a support ticket with the issue type 'Payment' and include all relevant details.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: <UserCircle size={18} />,
    items: [
      {
        q: "Do I need an account to use the app?",
        a: "You can browse listings without an account, but contacting owners and raising support requests requires login.",
      },
      {
        q: "Is my personal data safe?",
        a: "Yes. We do not sell user data. Your information is used only to provide services and support.",
      },
    ],
  },
  {
    category: "Support",
    icon: <Headphones size={18} />,
    items: [
      {
        q: "How do I contact support?",
        a: "Go to the Contact Support page, submit your issue, and track its status from 'My Support Requests'.",
      },
      {
        q: "How long does support take to respond?",
        a: "High-urgency issues are prioritized. Most queries are addressed within 24–48 hours.",
      },
    ],
  },
];

const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItem, setOpenItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...faqData.map((f) => f.category)];

  const filtered = useMemo(() => {
    return faqData
      .filter((group) =>
        activeCategory === "All" ? true : group.category === activeCategory,
      )
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, searchQuery]);

  const totalResults = filtered.reduce((acc, g) => acc + g.items.length, 0);

  const toggleItem = (key) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="faq-page">
      {/* ===== HERO ===== */}
      <section className="faq-hero">
        <div className="faq-hero-badge">
          <HelpCircle size={14} /> Help Center
        </div>
        <h1>
          Frequently Asked <span className="faq-highlight">Questions</span>
        </h1>
        <p className="faq-subtitle">
          Clear answers to common questions about rooms, bookings, payments, and
          support.
        </p>

        {/* Search */}
        <div className="faq-search-wrapper">
          <Search size={18} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search your question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="faq-search-clear"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>
      </section>

      <div className="faq-content">
        {/* ===== CATEGORY TABS ===== */}
        <div className="faq-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`faq-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setOpenItem(null);
              }}
            >
              {cat === "All"
                ? null
                : faqData.find((f) => f.category === cat)?.icon}
              {cat}
            </button>
          ))}
        </div>

        {/* ===== RESULTS COUNT ===== */}
        {searchQuery && (
          <p className="faq-results-count">
            {totalResults > 0
              ? `${totalResults} result${totalResults > 1 ? "s" : ""} found for "${searchQuery}"`
              : `No results found for "${searchQuery}"`}
          </p>
        )}

        {/* ===== FAQ GROUPS ===== */}
        {filtered.length === 0 ? (
          <div className="faq-empty">
            <HelpCircle size={40} />
            <p>No questions found. Try a different search.</p>
          </div>
        ) : (
          filtered.map((group) => (
            <div key={group.category} className="faq-group">
              <div className="faq-group-header">
                <span className="faq-group-icon">{group.icon}</span>
                <h2>{group.category}</h2>
                <span className="faq-group-count">{group.items.length}</span>
              </div>

              <div className="faq-group-items">
                {group.items.map((item, idx) => {
                  const key = `${group.category}-${idx}`;
                  const isOpen = openItem === key;
                  return (
                    <div
                      key={key}
                      className={`faq-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleItem(key)}
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          size={18}
                          className={`faq-chevron ${isOpen ? "open" : ""}`}
                        />
                      </button>
                      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                        <p>{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* ===== STILL NEED HELP ===== */}
        <div className="faq-cta">
          <MessageCircle size={28} />
          <div>
            <h3>Still have questions?</h3>
            <p>Our support team is here to help you 24/7.</p>
          </div>
          <a href="/contact" className="faq-cta-btn">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
