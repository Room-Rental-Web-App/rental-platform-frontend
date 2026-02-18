import React, { useState, useEffect, useRef } from "react";
import {
  CircleDollarSign,
  CalendarX,
  ShieldCheck,
  RefreshCcw,
  ChevronDown,
  ArrowUp,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import "../../CSS/utils/theme.css";
import "../../CSS/RefundPolicy.css";

const RefundPolicy = () => {
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
    { id: "section-1", label: "Premium Membership Refunds" },
    { id: "section-2", label: "Exceptional Cases" },
    { id: "section-3", label: "Refund Process" },
    { id: "section-4", label: "Cancellation Policy" },
    { id: "section-faq", label: "FAQs" },
  ];

  const faqData = [
    {
      id: "faq-1",
      q: "How long does a refund take?",
      a: "Approved refunds are processed within 5–7 working days and credited back to your original payment method.",
    },
    {
      id: "faq-2",
      q: "Can I get a partial refund?",
      a: "No. RoomsDekho does not offer partial refunds. Refunds are only considered for technical failures or duplicate payments.",
    },
    {
      id: "faq-3",
      q: "What proof do I need to submit?",
      a: "Please provide your transaction ID, date of payment, and a brief description of the issue when contacting support.",
    },
    {
      id: "faq-4",
      q: "Will my account be affected after cancellation?",
      a: "No. Your premium features remain active until the end of the current billing cycle after cancellation.",
    },
  ];

  const cardData = [
    {
      id: "section-1",
      icon: <CalendarX size={22} />,
      title: "1. Premium Membership Refunds",
      content: (
        <p>
          Generally, all payments for RoomsDekho Premium are{" "}
          <strong style={{ color: "var(--primary)" }}>non-refundable</strong>.
          Once the premium features are activated on your account, the service
          is considered consumed.
        </p>
      ),
    },
    {
      id: "section-2",
      icon: <RefreshCcw size={22} />,
      title: "2. Exceptional Cases",
      special: true,
      content: (
        <>
          <p>Refunds may be considered only in the following scenarios:</p>
          <ul className="legal-list">
            <li>
              Technical failures where premium features were never activated
              despite successful payment.
            </li>
            <li>
              Duplicate payments made due to a technical glitch on our platform.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "section-3",
      icon: <ShieldCheck size={22} />,
      title: "3. Refund Process",
      content: (
        <p>
          If you believe you are eligible for a refund, contact our support team
          at{" "}
          <strong style={{ color: "var(--primary)" }}>
            roomdekhobharat@gmail.com
          </strong>{" "}
          within <strong>48 hours</strong> of the transaction. Approved refunds
          will be processed within <strong>5–7 working days</strong>.
        </p>
      ),
    },
    {
      id: "section-4",
      icon: <CalendarX size={22} />,
      title: "4. Cancellation Policy",
      content: (
        <p>
          You can cancel your subscription at any time; however, you will
          continue to have access to premium features until the end of your
          current billing period.
        </p>
      ),
    },
  ];

  return (
    <div className="legal-container">
      {/* ===== HERO ===== */}
      <section className="legal-hero">
        <h1>
          Refund <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 2026</p>
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
            <CircleDollarSign size={24} />
            <p>
              We value your trust. Please read our refund terms regarding
              premium memberships and services carefully.
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

export default RefundPolicy;
