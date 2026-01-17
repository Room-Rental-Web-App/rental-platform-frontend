import React from "react";
import { Scale, ShieldAlert, CheckCircle, Info, UserCheck } from "lucide-react";
import "../css/LegalPages.css";

const TermsAndService = () => {
  return (
    <div className="legal-container">
      {/* Hero Section */}
      <section className="legal-hero">
        <h1>
          Terms and <span className="highlight">Service</span>
        </h1>
        <p className="last-updated">Last Updated: January 17, 2026</p>
      </section>

      <div className="legal-body">
        {/* Important Notice */}
        <div className="alert-box">
          <Info size={24} />
          <p>
            By using RoomsDekho.com, you signify your agreement to these Terms
            and Service. If you do not agree, please refrain from using our
            platform.
          </p>
        </div>

        {/* 1. Account Usage */}
        <div className="legal-card">
          <div className="card-header">
            <UserCheck className="icon-orange" />
            <h3>1. Account Responsibility</h3>
          </div>
          <p>
            Users are responsible for maintaining the security of their
            accounts. Any activity performed through your account is your sole
            responsibility.
          </p>
        </div>

        {/* 2. Platform Rules */}
        <div className="legal-card">
          <div className="card-header">
            <ShieldAlert className="icon-orange" />
            <h3>2. Prohibited Conduct</h3>
          </div>
          <ul className="legal-list">
            <li>Posting inaccurate, fake, or misleading room descriptions.</li>
            <li>
              Engaging in any form of harassment towards owners or tenants.
            </li>
            <li>Attempting to bypass our system to scrape user data.</li>
          </ul>
        </div>

        {/* 3. The Zero Brokerage Clause */}
        <div className="legal-card special-highlight">
          <div className="card-header">
            <CheckCircle className="icon-orange" />
            <h3>3. Zero Brokerage Guarantee</h3>
          </div>
          <p>
            RoomsDekho is a peer-to-peer rental platform. Charging or demanding
            brokerage fees is strictly prohibited. Report any such demands to
            our support team immediately.
          </p>
        </div>

        {/* 4. Content Ownership */}
        <div className="legal-card">
          <div className="card-header">
            <Scale className="icon-orange" />
            <h3>4. Intellectual Property</h3>
          </div>
          <p>
            The logo, design, and content of RoomsDekho are protected by
            copyright. Users may not reproduce or use our assets without written
            permission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndService;
