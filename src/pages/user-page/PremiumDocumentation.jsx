import React, { useState } from "react";
import {
  FileText,
  Shield,
  CreditCard,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import "../../css/Documentation.css";

const PremiumDocumentation = () => {
  const [activeSection, setActiveSection] = useState("subscription");

  const sections = [
    {
      id: "subscription",
      title: "Subscription Terms",
      icon: <CreditCard size={20} />,
    },
    { id: "usage", title: "Fair Usage Policy", icon: <Shield size={20} /> },
    {
      id: "refund",
      title: "Refund & Cancellation",
      icon: <FileText size={20} />,
    },
    { id: "support", title: "Premium Support", icon: <HelpCircle size={20} /> },
  ];

  const content = {
    subscription: {
      title: "Subscription & Billing",
      text: "Premium plans are billed in advance on a monthly or yearly basis. Your subscription will automatically renew unless canceled 24 hours before the end of the current period.",
    },
    usage: {
      title: "Fair Usage Policy",
      text: "Users are prohibited from using premium contact details for spamming or commercial marketing. Violation of this policy will lead to immediate account suspension without refund.",
    },
    refund: {
      title: "Refund & Cancellation",
      text: "We offer a 48-hour 'No Questions Asked' refund for first-time subscribers. After 48 hours, payments are non-refundable. You can cancel your plan anytime from your dashboard.",
    },
    support: {
      title: "Priority Support Access",
      text: "Gold and Platinum members get access to 24/7 priority chat support. Tickets raised by premium members are resolved within a guaranteed timeframe of 4 hours.",
    },
  };

  return (
    <div className="doc-page-container">
      <div className="doc-sidebar">
        <div className="sidebar-header">
          <h3>Premium Docs</h3>
        </div>
        {sections.map((sec) => (
          <button
            key={sec.id}
            className={`sidebar-link ${
              activeSection === sec.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(sec.id)}
          >
            {sec.icon} {sec.title}
          </button>
        ))}
      </div>

      <div className="doc-content-area">
        <div className="content-card">
          <h1>{content[activeSection].title}</h1>
          <p className="last-updated">Last Updated: Dec 2025</p>
          <hr />
          <div className="text-body">
            <p>{content[activeSection].text}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="doc-actions">
            <button className="btn-accept">
              I Agree to Terms <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDocumentation;
