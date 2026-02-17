import React from "react";
import {
  Scale,
  ShieldAlert,
  CheckCircle,
  Info,
  UserCheck,
  Ban,
  FileText,
  AlertTriangle,
  Mail,
  RefreshCw,
} from "lucide-react";
import "../../css/LegalPages.css";

const sections = [
  {
    num: "01",
    icon: <UserCheck size={20} />,
    title: "Account Responsibility",
    content: (
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials. Any activity under your account will be considered your
        responsibility. Please use a strong password and log out from shared
        devices.
      </p>
    ),
  },
  {
    num: "02",
    icon: <ShieldAlert size={20} />,
    title: "Prohibited Conduct",
    content: (
      <ul className="legal-list">
        <li>Posting false or misleading property information.</li>
        <li>Harassing, abusing, or threatening other users.</li>
        <li>Attempting to hack, scrape, or misuse platform data.</li>
        <li>Using the platform for illegal purposes.</li>
        <li>Creating multiple accounts to bypass suspension.</li>
        <li>Spamming or collecting user contact details without consent.</li>
      </ul>
    ),
  },
  {
    num: "03",
    icon: <CheckCircle size={20} />,
    title: "Zero Brokerage Guarantee",
    special: true,
    content: (
      <>
        <p>
          RoomsDekho operates as a{" "}
          <strong className="text-accent">100% zero brokerage</strong> platform
          — connecting tenants and owners directly, for free. Charging brokerage
          or commission fees of any kind is strictly prohibited.
        </p>
        <p>
          If any user, agent, or listing violates this policy, please report it
          to our support team immediately. Violators face permanent account
          termination.
        </p>
        <div className="guarantee-badge">
          <CheckCircle size={14} />
          Zero Brokerage — Always Free
        </div>
      </>
    ),
  },
  {
    num: "04",
    icon: <Scale size={20} />,
    title: "Intellectual Property",
    content: (
      <p>
        All content including our logo, design system, branding, platform
        features, and codebase are exclusively owned by RoomsDekho and protected
        under applicable copyright and trademark laws. Unauthorized reproduction
        or commercial use is strictly prohibited.
      </p>
    ),
  },
  {
    num: "05",
    icon: <FileText size={20} />,
    title: "User Eligibility",
    content: (
      <p>
        You must be at least{" "}
        <strong className="text-accent">18 years of age</strong> to register and
        use RoomsDekho. By creating an account, you confirm that all information
        provided is accurate, current, and complete.
      </p>
    ),
  },
  {
    num: "06",
    icon: <FileText size={20} />,
    title: "Property Listings and Accuracy",
    content: (
      <>
        <p>
          Property owners are solely responsible for the accuracy, completeness,
          and legality of their listings. RoomsDekho does not guarantee
          availability, pricing accuracy, ownership claims, or property
          condition.
        </p>
        <p>
          We reserve the right to remove any listing flagged by the community as
          fraudulent or in violation of our policies.
        </p>
      </>
    ),
  },
  {
    num: "07",
    icon: <Info size={20} />,
    title: "Platform Role and Limitations",
    content: (
      <p>
        RoomsDekho acts solely as an intermediary platform facilitating
        connections between tenants and property owners. We are not a party to
        any rental agreements or transactions and are not liable for any
        disputes, damages, or miscommunications arising from such interactions.
      </p>
    ),
  },
  {
    num: "08",
    icon: <Ban size={20} />,
    title: "Account Suspension and Termination",
    content: (
      <p>
        We reserve the right to suspend or permanently terminate accounts that
        violate our policies, provide false information, or engage in harmful
        activities. Users may appeal decisions by contacting support within{" "}
        <strong className="text-accent">14 days</strong>.
      </p>
    ),
  },
  {
    num: "09",
    icon: <AlertTriangle size={20} />,
    title: "Limitation of Liability",
    content: (
      <p>
        RoomsDekho is not liable for any direct, indirect, incidental,
        consequential, or punitive damages resulting from the use of our
        platform, inability to access services, or any interactions with other
        users.
      </p>
    ),
  },
  {
    num: "10",
    icon: <ShieldAlert size={20} />,
    title: "Privacy Policy",
    content: (
      <p>
        Your use of RoomsDekho is also governed by our{" "}
        <strong className="text-accent">Privacy Policy</strong>, which details
        how we collect, store, process, and protect your personal data. We
        encourage you to read it carefully before using our services.
      </p>
    ),
  },
  {
    num: "11",
    icon: <RefreshCw size={20} />,
    title: "Changes to Terms",
    content: (
      <p>
        RoomsDekho reserves the right to update these terms at any time.
        Significant changes will be communicated via email or in-app
        notification. Continued use of the platform after changes constitutes
        your acceptance of the updated Terms.
      </p>
    ),
  },
  {
    num: "12",
    icon: <Mail size={20} />,
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions regarding these Terms, please reach out to our
          team:
        </p>
        <div className="contact-row">
          <div className="contact-item">
            <Mail size={15} />
            <span>roomdekhobharat@gmail.com</span>
          </div>
          <div className="contact-item">
            <Info size={15} />
            <span>Response within 24–48 hours</span>
          </div>
        </div>
      </>
    ),
  },
];

const TermsAndService = () => {
  return (
    <div className="legal-container">
      {/* ── Hero ── */}
      <section className="legal-hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Legal Document
        </div>
        <h1>
          Terms &amp; <span className="highlight">Service</span>
        </h1>
        <p className="last-updated">Last Updated: January 17, 2026</p>
        <div className="hero-meta">
          <span>12 Sections</span>
          <span className="meta-divider" />
          <span>Effective Immediately</span>
          <span className="meta-divider" />
          <span>India Jurisdiction</span>
        </div>
      </section>

      <div className="legal-body">
        {/* ── Alert ── */}
        <div className="alert-box">
          <Info size={20} />
          <p>
            By using RoomsDekho.com, you agree to comply with these Terms of
            Service. If you do not agree with any part of these terms, please do
            not use our platform.
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
          © 2026 RoomsDekho · These Terms were last updated on{" "}
          <strong>January 17, 2026</strong>. By continuing to use our platform
          you confirm you have read and accepted these terms.
        </p>
      </footer>
    </div>
  );
};

export default TermsAndService;
