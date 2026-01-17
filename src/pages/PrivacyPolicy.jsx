import React from "react";
import { ShieldCheck, Lock, EyeOff, Database } from "lucide-react";
import "../css/LegalPages.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      {/* Hero Section */}
      <section className="legal-hero">
        <h1>
          Privacy <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 17, 2026</p>
      </section>

      <div className="legal-body">
        {/* Intro Box */}
        <div className="alert-box">
          <ShieldCheck size={24} />
          <p>
            Your privacy is our priority. This policy explains how RoomsDekho
            collects, uses, and protects your personal information.
          </p>
        </div>

        {/* 1. Data Collection */}
        <div className="legal-card">
          <div className="card-header">
            <Database className="icon-orange" />
            <h3>1. Information We Collect</h3>
          </div>
          <p>
            When you register as a user or owner, we collect basic details such
            as your name, email address, phone number, and property details (for
            owners). This helps us provide a verified experience.
          </p>
        </div>

        {/* 2. Security Clause */}
        <div className="legal-card special-highlight">
          <div className="card-header">
            <Lock className="icon-orange" />
            <h3>2. Data Security</h3>
          </div>
          <p>
            We implement industry-standard security measures to protect your
            data from unauthorized access. Your passwords are encrypted, and
            your contact details are only shared with verified parties as per
            your interaction on the platform.
          </p>
        </div>

        {/* 3. Third Party Policy */}
        <div className="legal-card">
          <div className="card-header">
            <EyeOff className="icon-orange" />
            <h3>3. No Third-Party Selling</h3>
          </div>
          <p>
            We strictly do not sell or rent your personal information to
            third-party marketing companies. Your data is used solely for the
            functionality of RoomsDekho.
          </p>
        </div>

        {/* 4. Cookies */}
        <div className="legal-card">
          <div className="card-header">
            <ShieldCheck className="icon-orange" />
            <h3>4. Cookies and Tracking</h3>
          </div>
          <p>
            We use cookies to improve your browsing experience, remember your
            preferences, and analyze our website traffic to provide better room
            recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
