import React from "react";
import {
  CircleDollarSign,
  CalendarX,
  ShieldCheck,
  RefreshCcw,
  Clock,
  Mail,
  AlertTriangle,
} from "lucide-react";
import "../../css/LegalPages.css";

const sections = [
  {
    num: "01",
    icon: <CalendarX size={20} />,
    title: "Premium Membership Refunds",
    content: (
      <>
        <p>
          All payments for{" "}
          <strong className="text-accent">RoomsDekho Premium</strong> are
          generally <strong className="text-accent">non-refundable</strong>.
          Once premium features are activated on your account, the service is
          considered consumed and no refund will be issued.
        </p>
        <p>
          We encourage you to review the features of each plan before
          purchasing. If you have questions before subscribing, contact our
          support team.
        </p>
      </>
    ),
  },
  {
    num: "02",
    icon: <RefreshCcw size={20} />,
    title: "Exceptional Cases",
    special: true,
    content: (
      <>
        <p>
          Refunds may be considered{" "}
          <strong className="text-accent">only</strong> in the following
          scenarios:
        </p>
        <ul className="legal-list">
          <li>
            Technical failures where premium features were{" "}
            <strong className="text-accent">never activated</strong> despite a
            successful payment.
          </li>
          <li>
            Duplicate payments made due to a technical glitch on our platform.
          </li>
        </ul>
        <div className="guarantee-badge">
          <ShieldCheck size={14} />
          Reviewed case-by-case within 72 hours
        </div>
      </>
    ),
  },
  {
    num: "03",
    icon: <ShieldCheck size={20} />,
    title: "Refund Process",
    content: (
      <>
        <p>
          If you believe you qualify for a refund under the exceptional cases
          above, please follow these steps:
        </p>
        <ul className="legal-list">
          <li>
            Contact our support team at{" "}
            <strong className="text-accent">support@roomsdekho.com</strong>{" "}
            within <strong className="text-accent">48 hours</strong> of the
            transaction.
          </li>
          <li>
            Include your registered email address, transaction ID, and a brief
            description of the issue.
          </li>
          <li>
            Our team will review your request and respond within{" "}
            <strong className="text-accent">3 working days</strong>.
          </li>
        </ul>
        <div className="contact-row">
          <div className="contact-item">
            <Mail size={15} />
            <span>roomdekhobharat@gmail.com</span>
          </div>
          <div className="contact-item">
            <Clock size={15} />
            <span>Approved refunds: 5–7 working days</span>
          </div>
        </div>
      </>
    ),
  },
  {
    num: "04",
    icon: <CalendarX size={20} />,
    title: "Cancellation Policy",
    content: (
      <p>
        You may cancel your subscription at any time from your account settings.
        After cancellation, you will retain access to premium features until the
        end of your{" "}
        <strong className="text-accent">current billing period</strong>. No
        partial refunds are issued for unused days within a billing cycle.
      </p>
    ),
  },
  {
    num: "05",
    icon: <AlertTriangle size={20} />,
    title: "Disputes & Chargebacks",
    content: (
      <p>
        We strongly encourage users to contact our support team before
        initiating a chargeback with their bank or payment provider. Unresolved
        chargebacks may result in account suspension. RoomsDekho reserves the
        right to contest any chargeback that does not meet our refund criteria.
      </p>
    ),
  },
  {
    num: "06",
    icon: <RefreshCcw size={20} />,
    title: "Changes to This Policy",
    content: (
      <p>
        RoomsDekho reserves the right to update this Refund Policy at any time.
        Changes will be communicated via email or in-app notification. Continued
        use of premium services after any update constitutes acceptance of the
        revised policy.
      </p>
    ),
  },
];

const RefundPolicy = () => {
  return (
    <div className="legal-container">
      {/* ── Hero ── */}
      <section className="legal-hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Legal Document
        </div>
        <h1>
          Refund <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 2026</p>
        <div className="hero-meta">
          <span>6 Sections</span>
          <span className="meta-divider" />
          <span>Premium Plans</span>
          <span className="meta-divider" />
          <span>India Jurisdiction</span>
        </div>
      </section>

      <div className="legal-body">
        {/* ── Alert ── */}
        <div className="alert-box">
          <CircleDollarSign size={20} />
          <p>
            We value your trust. Please read our refund terms regarding premium
            memberships and services carefully before making any purchase.
          </p>
        </div>

        {/* ── Cards ── */}
        {sections.map((s, i) => (
          <div
            key={s.num}
            className={`legal-card${s.special ? " special-highlight" : ""}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="card-header">
              <div className="icon-orange">{s.icon}</div>
              <div className="card-title-group">
                <span className="section-num">Section {s.num}</span>
                <h3>{s.title}</h3>
              </div>
            </div>
            <div className="card-body">{s.content}</div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="legal-footer">
        <p>
          © 2026 RoomsDekho · Refund Policy last updated{" "}
          <strong>January 2026</strong>. For any billing concerns, reach us at{" "}
          <strong>support@roomsdekho.com</strong>.
        </p>
      </footer>
    </div>
  );
};

export default RefundPolicy;
