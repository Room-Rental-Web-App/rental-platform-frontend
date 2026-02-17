import React, { useState, useEffect, useRef } from "react";
import {
  Scale,
  ShieldAlert,
  CheckCircle,
  Info,
  UserCheck,
  ChevronDown,
  ArrowUp,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import "../../CSS/utils/theme.css";
import "../../CSS/TermsAndService.css";

const TermsAndService = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("section-1");
  const [openFaq, setOpenFaq] = useState(null);

  const sectionRefs = {
    "section-1": useRef(null),
    "section-2": useRef(null),
    "section-3": useRef(null),
    "section-4": useRef(null),
    "section-faq": useRef(null),
  };

  // Back to top + active section tracker
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const scrollPos = window.scrollY + 200;
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current && ref.current.offsetTop <= scrollPos) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    sectionRefs[id]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggleAccordion = (id) =>
    setOpenAccordion(openAccordion === id ? null : id);
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  const tocItems = [
    { id: "section-1", label: "Account Responsibility" },
    { id: "section-2", label: "Prohibited Conduct" },
    { id: "section-3", label: "Zero Brokerage Guarantee" },
    { id: "section-4", label: "Intellectual Property" },
    { id: "section-faq", label: "FAQs" },
  ];

  const faqData = [
    {
      id: "faq-1",
      q: "What happens if someone charges brokerage on RoomsDekho?",
      a: "RoomsDekho is a zero brokerage platform. If anyone demands brokerage fees, report it to our support team immediately at support@roomsdekho.com.",
    },
    {
      id: "faq-2",
      q: "Can I share my account with someone else?",
      a: "No. You are solely responsible for all activity under your account. Sharing your credentials with others is not permitted.",
    },
    {
      id: "faq-3",
      q: "What qualifies as prohibited conduct?",
      a: "Posting fake listings, harassing other users, or attempting to scrape user data are all strictly prohibited and may result in account suspension.",
    },
    {
      id: "faq-4",
      q: "Can I use RoomsDekho's logo or content on my website?",
      a: "No. All logos, designs, and content are protected by copyright. Written permission from RoomsDekho is required before any use.",
    },
  ];

  const cardData = [
    {
      id: "section-1",
      icon: <UserCheck size={22} />,
      title: "1. Account Responsibility",
      content: (
        <p>
          Users are responsible for maintaining the security of their accounts.
          Any activity performed through your account is your{" "}
          <strong style={{ color: "var(--primary)" }}>
            sole responsibility
          </strong>
          .
        </p>
      ),
    },
    {
      id: "section-2",
      icon: <ShieldAlert size={22} />,
      title: "2. Prohibited Conduct",
      content: (
        <ul className="legal-list">
          <li>Posting inaccurate, fake, or misleading room descriptions.</li>
          <li>Engaging in any form of harassment towards owners or tenants.</li>
          <li>Attempting to bypass our system to scrape user data.</li>
        </ul>
      ),
    },
    {
      id: "section-3",
      icon: <CheckCircle size={22} />,
      title: "3. Zero Brokerage Guarantee",
      special: true,
      content: (
        <p>
          RoomsDekho is a peer-to-peer rental platform. Charging or demanding
          brokerage fees is{" "}
          <strong style={{ color: "var(--primary)" }}>
            strictly prohibited
          </strong>
          . Report any such demands to our support team immediately.
        </p>
      ),
    },
    {
      id: "section-4",
      icon: <Scale size={22} />,
      title: "4. Intellectual Property",
      content: (
        <p>
          The logo, design, and content of RoomsDekho are protected by
          copyright. Users may not reproduce or use our assets without{" "}
          <strong style={{ color: "var(--primary)" }}>
            written permission
          </strong>
          .
        </p>
      ),
    },
  ];

  return (
    <div className="legal-container">
      {/* ===== HERO ===== */}
      <section className="legal-hero">
        <h1>
          Terms and <span className="highlight">Service</span>
        </h1>
        <p className="last-updated">Last Updated: January 17, 2026</p>
      </section>

      {/* ===== MAIN GRID ===== */}
      <div className="legal-grid">
        {/* TABLE OF CONTENTS */}
        <aside className="toc-sidebar">
          <div className="toc-title">
            <BookOpen size={13} /> On this page
          </div>
          {tocItems.map((item) => (
            <button
              key={item.id}
              className={`toc-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* CONTENT */}
        <div className="legal-body">
          {/* Alert Box */}
          <div className="alert-box">
            <Info size={24} />
            <p>
              By using RoomsDekho.com, you signify your agreement to these Terms
              and Service. If you do not agree, please refrain from using our
              platform.
            </p>
          </div>

          {/* Accordion Cards */}
          {cardData.map((card) => (
            <div
              key={card.id}
              ref={sectionRefs[card.id]}
              className={`legal-card ${card.special ? "special-highlight" : ""}`}
            >
              <div
                className="card-header"
                onClick={() => toggleAccordion(card.id)}
              >
                <span className="icon-orange">{card.icon}</span>
                <h3>{card.title}</h3>
                <ChevronDown
                  size={18}
                  className={`chevron-icon ${openAccordion === card.id ? "open" : ""}`}
                />
              </div>
              <div
                className={`card-body ${openAccordion === card.id ? "open" : ""}`}
              >
                {card.content}
              </div>
            </div>
          ))}

          {/* FAQ Section */}
          <div ref={sectionRefs["section-faq"]} className="faq-section">
            <div className="faq-header">
              <HelpCircle size={20} className="icon-orange" />
              <h3>Frequently Asked Questions</h3>
            </div>
            {faqData.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${openFaq === faq.id ? "open" : ""}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  {faq.q}
                  <ChevronDown
                    size={16}
                    style={{
                      flexShrink: 0,
                      transition: "transform 0.3s ease",
                      transform:
                        openFaq === faq.id ? "rotate(180deg)" : "rotate(0)",
                      color:
                        openFaq === faq.id
                          ? "var(--primary)"
                          : "var(--text-tertiary)",
                    }}
                  />
                </button>
                <div
                  className={`faq-answer ${openFaq === faq.id ? "open" : ""}`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BACK TO TOP ===== */}
      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        title="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default TermsAndService;
