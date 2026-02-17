import React from "react";
import {
  ShieldCheck,
  Database,
  Eye,
  Users,
  Lock,
  Globe,
  Scale,
  Info,
  Smartphone,
  Trash2,
} from "lucide-react";
import "../../css/LegalPages.css";

const sections = [
  {
    num: "01",
    icon: <Database size={20} />,
    title: "Personal Data We Collect",
    content: (
      <>
        <p>
          We collect various types of Personal Data when you access our Platform
          or Services:
        </p>
        <div className="sub-section">
          <h4>A. Information You Give Us</h4>
          <ul className="legal-list">
            <li>
              <strong className="text-accent">Personal Details:</strong> Name,
              address, email, phone number, and username.
            </li>
            <li>
              <strong className="text-accent">Property Details:</strong> Nature
              of property, location, dimensions, photographs, pricing, and
              amenities.
            </li>
            <li>
              <strong className="text-accent">Identity Documents:</strong>{" "}
              Aadhaar, Voter ID, PAN, or Passport for identity and property
              verification.
            </li>
            <li>
              <strong className="text-accent">Payment Information:</strong> We
              use third-party providers. We do{" "}
              <strong className="text-accent">not</strong> store bank account or
              card numbers.
            </li>
            <li>
              <strong className="text-accent">Voice Recordings:</strong> If you
              include voiceovers in your property listings.
            </li>
          </ul>
        </div>
        <div className="sub-section">
          <h4>B. Information Collected Automatically</h4>
          <ul className="legal-list">
            <li>
              <strong className="text-accent">
                Usage &amp; Technical Data:
              </strong>{" "}
              Search queries, account settings, IP address, and hardware model.
            </li>
            <li>
              <strong className="text-accent">Location Data:</strong>{" "}
              Approximate location derived from your IP address.
            </li>
            <li>
              <strong className="text-accent">Cookies:</strong> Technologies to
              recognise your device and remember your preferences.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    num: "02",
    icon: <Eye size={20} />,
    title: "How We Use Your Personal Data",
    content: (
      <>
        <p>We process your data for the following purposes:</p>
        <ul className="legal-list">
          <li>
            <strong className="text-accent">Provision of Services:</strong>{" "}
            Account creation, property listing, and connectivity between users.
          </li>
          <li>
            <strong className="text-accent">Marketing:</strong> Sending
            promotional material and notifying you of discounts (with your
            consent).
          </li>
          <li>
            <strong className="text-accent">Platform Improvement:</strong> For
            research, surveys, and personalised user experience.
          </li>
          <li>
            <strong className="text-accent">Fraud Prevention:</strong>{" "}
            Identifying suspicious listings and verifying user authenticity.
          </li>
          <li>
            <strong className="text-accent">Legal Obligations:</strong>{" "}
            Complying with applicable law and defending legal rights.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    icon: <Globe size={20} />,
    title: "Cookies & Tracking",
    content: (
      <p>
        We use cookies to collect information about platform activity and
        improve your experience. You can control cookies through your browser
        settings, though blocking them may affect certain features and
        functionality.
      </p>
    ),
  },
  {
    num: "04",
    icon: <Users size={20} />,
    title: "Who We Share Your Data With",
    special: true,
    content: (
      <>
        <p>
          We disclose Personal Data only for specific, legitimate purposes with:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-accent">Service Providers:</strong> Vendors
            who help operate the platform or verify properties.
          </li>
          <li>
            <strong className="text-accent">Platform Users:</strong> Owners,
            renters, or brokers to establish direct connectivity.
          </li>
          <li>
            <strong className="text-accent">Banking Partners:</strong> For home
            loan services based on your expression of interest.
          </li>
          <li>
            <strong className="text-accent">Legal Entities:</strong> Responding
            to subpoenas, court orders, or corporate restructuring requirements.
          </li>
        </ul>
        <div className="guarantee-badge">
          <ShieldCheck size={14} />
          We never sell your personal data
        </div>
      </>
    ),
  },
  {
    num: "05",
    icon: <Lock size={20} />,
    title: "Storage and Protection",
    content: (
      <p>
        Your data is stored and processed in{" "}
        <strong className="text-accent">India</strong>. We have invested
        significant resources in electronic and procedural safeguards to protect
        your Personal Data from unauthorised access, disclosure, or misuse.
      </p>
    ),
  },
  {
    num: "06",
    icon: <Scale size={20} />,
    title: "Your Rights",
    content: (
      <>
        <p>You have the following rights regarding your Personal Data:</p>
        <ul className="legal-list">
          <li>Request access to the data we hold about you.</li>
          <li>Correct inaccurate or incomplete information.</li>
          <li>Request deletion of your Personal Data.</li>
          <li>
            Withdraw consent for data processing at any time — though this may
            affect service availability.
          </li>
        </ul>
        <p style={{ marginTop: "12px" }}>
          To exercise any of these rights, write to us at{" "}
          <strong className="text-accent">privacy@roomsdekho.com</strong>.
        </p>
      </>
    ),
  },
  {
    num: "07",
    icon: <Trash2 size={20} />,
    title: "Data Retention",
    content: (
      <p>
        We retain your Personal Data only as long as necessary to fulfil the
        purposes outlined in this policy, or as required by applicable law. Once
        data is no longer needed, it is securely deleted or anonymised.
      </p>
    ),
  },
  {
    num: "08",
    icon: <Smartphone size={20} />,
    title: "Third-Party Links",
    content: (
      <p>
        Our platform may contain links to external websites or services. We are
        not responsible for the privacy practices or content of those third
        parties. We encourage you to review their privacy policies before
        sharing any personal data.
      </p>
    ),
  },
  {
    num: "09",
    icon: <Info size={20} />,
    title: "Grievance Redressal",
    grievance: true,
    content: (
      <>
        <p>
          In case of any grievances related to your privacy or Personal Data,
          please contact our appointed Grievance Officer:
        </p>
        <div className="officer-details">
          <p>
            <strong className="text-accent">Officer Name:</strong> Apurv Sud
          </p>
          <p>
            <strong className="text-accent">Company:</strong> RoomsDekho India
            Limited
          </p>
          <p>
            <strong className="text-accent">Address:</strong> B-8, Sector 132,
            Noida, India
          </p>
          <p>
            <strong className="text-accent">Email:</strong>{" "}
            roomdekhobharat@gmail.com
          </p>
        </div>
        <div className="contact-row" style={{ marginTop: "16px" }}>
          <div className="contact-item">
            <Info size={15} />
            <span>Response within 30 days</span>
          </div>
          <div className="contact-item">
            <ShieldCheck size={15} />
            <span>DPDP Act compliant</span>
          </div>
        </div>
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      {/* ── Hero ── */}
      <section className="legal-hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Legal Document
        </div>
        <h1>
          Privacy <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 18, 2026</p>
        <div className="hero-meta">
          <span>9 Sections</span>
          <span className="meta-divider" />
          <span>DPDP Act Compliant</span>
          <span className="meta-divider" />
          <span>India Jurisdiction</span>
        </div>
      </section>

      <div className="legal-body full-content">
        {/* ── Alert ── */}
        <div className="alert-box">
          <ShieldCheck size={20} />
          <p>
            At RoomsDekho, we recognise the importance of your online privacy
            and are committed to protecting your personally identifiable
            information in accordance with this policy.
          </p>
        </div>

        {/* ── Cards ── */}
        {sections.map((s, i) => (
          <div
            key={s.num}
            className={`legal-card${s.special ? " special-highlight" : ""}${
              s.grievance ? " grievance-box" : ""
            }`}
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
          © 2026 RoomsDekho · Privacy Policy last updated on{" "}
          <strong>January 18, 2026</strong>. Your continued use of the platform
          signifies your acceptance of this policy.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
