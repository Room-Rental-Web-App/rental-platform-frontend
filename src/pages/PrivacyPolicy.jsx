import React from "react";
import {
  ShieldCheck,
  Database,
  Eye,
  Users,
  Lock,
  Trash2,
  Globe,
  Smartphone,
  Scale,
  Info,
} from "lucide-react";
import "../css/LegalPages.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <section className="legal-hero">
        <h1>
          Privacy <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 18, 2026</p>
      </section>

      <div className="legal-body full-content">
        <div className="alert-box">
          <ShieldCheck size={28} />
          <p>
            At RoomsDekho, we recognize the importance of your online privacy
            and are committed to protecting and managing your personally
            identifiable information (Personal Data) in accordance with this
            policy.
          </p>
        </div>

        {/* 1. Data We Collect */}
        <div className="legal-card">
          <div className="card-header">
            <Database className="icon-orange" />
            <h3>1. Personal Data We Collect</h3>
          </div>
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
        </div>

        {/* 2. How We Use Data */}
        <div className="legal-card">
          <div className="card-header">
            <Eye className="icon-orange" />
            <h3>2. How We Use Your Personal Data</h3>
          </div>
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
        </div>

        {/* 3. Cookies */}
        <div className="legal-card">
          <div className="card-header">
            <Globe className="icon-orange" />
            <h3>3. Cookies & Tracking</h3>
          </div>
          <p>
            We use Cookies to collect information about web-site activity. You
            can control cookies through your browser settings, though blocking
            them may affect your user experience.
          </p>
        </div>

        {/* 4. Data Sharing */}
        <div className="legal-card special-highlight">
          <div className="card-header">
            <Users className="icon-orange" />
            <h3>4. Who We Share Your Data With</h3>
          </div>
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
        </div>

        {/* 5. Storage & Security */}
        <div className="legal-card">
          <div className="card-header">
            <Lock className="icon-orange" />
            <h3>5. Storage and Protection</h3>
          </div>
          <p>
            Your data is stored and processed in India. We have invested
            significant resources in electronic and procedural safeguards to
            protect your Personal Data.
          </p>
        </div>

        {/* 6. User Rights */}
        <div className="legal-card">
          <div className="card-header">
            <Scale className="icon-orange" />
            <h3>6. Your Rights</h3>
          </div>
          <p>
            You may verify, correct, or erase your Personal Data by writing to
            us. You can also withdraw consent for data processing at any time,
            though this may affect service availability.
          </p>
        </div>

        {/* 7. Grievance Redressal */}
        <div className="legal-card grievance-box">
          <div className="card-header">
            <Info className="icon-orange" />
            <h3>7. Grievance Redressal</h3>
          </div>
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
              <strong>Email:</strong> privacy@roomsdekho.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
