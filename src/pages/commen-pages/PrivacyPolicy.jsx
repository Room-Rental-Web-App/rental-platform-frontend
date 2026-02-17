import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Database,
  Eye,
  Users,
  Lock,
  Scale,
  Info,
  Globe,
  ChevronDown,
  ArrowUp,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import "../../CSS/utils/theme.css";
import "../../CSS/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("section-1");
  const [openFaq, setOpenFaq] = useState(null);

  const sectionRefs = {
    "section-1": useRef(null),
    "section-2": useRef(null),
    "section-3": useRef(null),
    "section-4": useRef(null),
    "section-5": useRef(null),
    "section-6": useRef(null),
    "section-7": useRef(null),
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
    { id: "section-1", label: "Personal Data We Collect" },
    { id: "section-2", label: "How We Use Your Data" },
    { id: "section-3", label: "Cookies & Tracking" },
    { id: "section-4", label: "Who We Share Data With" },
    { id: "section-5", label: "Storage and Protection" },
    { id: "section-6", label: "Your Rights" },
    { id: "section-7", label: "Grievance Redressal" },
    { id: "section-faq", label: "FAQs" },
  ];

  const faqData = [
    {
      id: "faq-1",
      q: "Does RoomsDekho store my bank or card details?",
      a: "No. We use third-party payment providers and do not store your bank account or card numbers on our platform.",
    },
    {
      id: "faq-2",
      q: "Can I withdraw my consent for data processing?",
      a: "Yes. You can withdraw consent at any time by writing to us, though this may affect certain service features.",
    },
    {
      id: "faq-3",
      q: "How can I delete my personal data?",
      a: "You may request verification, correction, or erasure of your Personal Data by contacting our Grievance Officer at privacy@roomsdekho.com.",
    },
    {
      id: "faq-4",
      q: "Where is my data stored?",
      a: "Your data is stored and processed in India. We have electronic and procedural safeguards to protect your Personal Data.",
    },
  ];

  const cardData = [
    {
      id: "section-1",
      icon: <Database size={22} />,
      title: "1. Personal Data We Collect",
      content: (
        <>
          <p>
            We collect various types of Personal Data when you access our
            Platform or Services:
          </p>
          <div className="sub-section">
            <h4>A. Information You Give Us:</h4>
            <ul className="legal-list">
              <li>
                <strong>Personal Details:</strong> Name, address, email, phone
                number, and username.
              </li>
              <li>
                <strong>Property Details:</strong> Nature of property, location,
                dimensions, photographs, pricing, and amenities.
              </li>
              <li>
                <strong>Identification Documents:</strong> Aadhaar, Voter ID,
                PAN, or Passport for identity and property verification.
              </li>
              <li>
                <strong>Payment Information:</strong> We use third-party
                providers. We do not store bank account or card numbers.
              </li>
              <li>
                <strong>Voice Recordings:</strong> If you include voiceovers in
                your property listings.
              </li>
            </ul>
          </div>
          <div className="sub-section">
            <h4>B. Information We Collect Automatically:</h4>
            <ul className="legal-list">
              <li>
                <strong>Usage & Technical Data:</strong> Search queries, account
                settings, IP address, and hardware model.
              </li>
              <li>
                <strong>Location Data:</strong> Approximate location derived
                from your IP address.
              </li>
              <li>
                <strong>Cookies:</strong> Technologies to recognize your device
                and remember your preferences.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "section-2",
      icon: <Eye size={22} />,
      title: "2. How We Use Your Personal Data",
      content: (
        <>
          <p>We process your data for the following purposes:</p>
          <ul className="legal-list">
            <li>
              <strong>Provision of Services:</strong> Account creation, property
              listing, and connectivity between users.
            </li>
            <li>
              <strong>Marketing:</strong> Sending promotional material and
              notify you of discounts (with your consent).
            </li>
            <li>
              <strong>Platform Improvement:</strong> For research, surveys, and
              personalized user experience.
            </li>
            <li>
              <strong>Fraud Prevention:</strong> Identifying suspicious listings
              and verifying user authenticity.
            </li>
            <li>
              <strong>Legal Obligations:</strong> Complying with law and
              defending legal rights.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "section-3",
      icon: <Globe size={22} />,
      title: "3. Cookies & Tracking",
      content: (
        <p>
          We use Cookies to collect information about web-site activity. You can
          control cookies through your browser settings, though blocking them
          may affect your user experience.
        </p>
      ),
    },
    {
      id: "section-4",
      icon: <Users size={22} />,
      title: "4. Who We Share Your Data With",
      special: true,
      content: (
        <>
          <p>We disclose Personal Data only for specific purposes with:</p>
          <ul className="legal-list">
            <li>
              <strong>Service Providers:</strong> Vendors who help operate the
              platform or verify properties.
            </li>
            <li>
              <strong>Other Platform Users:</strong> Owners, renters, or brokers
              to establish direct connectivity.
            </li>
            <li>
              <strong>Banking Partners:</strong> For home loan services based on
              your expression of interest.
            </li>
            <li>
              <strong>Legal Entities:</strong> Responding to subpoenas, court
              orders, or corporate restructuring.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "section-5",
      icon: <Lock size={22} />,
      title: "5. Storage and Protection",
      content: (
        <p>
          Your data is stored and processed in India. We have invested
          significant resources in electronic and procedural safeguards to
          protect your Personal Data.
        </p>
      ),
    },
    {
      id: "section-6",
      icon: <Scale size={22} />,
      title: "6. Your Rights",
      content: (
        <p>
          You may verify, correct, or erase your Personal Data by writing to us.
          You can also withdraw consent for data processing at any time, though
          this may affect service availability.
        </p>
      ),
    },
    {
      id: "section-7",
      icon: <Info size={22} />,
      title: "7. Grievance Redressal",
      special: true,
      content: (
        <>
          <p>
            In case of any grievances, please contact our appointed Grievance
            Officer:
          </p>
          <div className="officer-details">
            <p>
              <strong>Officer Name:</strong> Apurv Sud
            </p>
            <p>
              <strong>Company:</strong> RoomsDekho India Limited
            </p>
            <p>
              <strong>Address:</strong> B-8, Sector 132, Noida, India
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <strong style={{ color: "var(--primary)" }}>
                privacy@roomsdekho.com
              </strong>
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="legal-container">
      {/* ===== HERO ===== */}
      <section className="legal-hero">
        <h1>
          Privacy <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 18, 2026</p>
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
            <ShieldCheck size={24} />
            <p>
              At RoomsDekho, we recognize the importance of your online privacy
              and are committed to protecting and managing your personally
              identifiable information (Personal Data) in accordance with this
              policy.
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

export default PrivacyPolicy;
