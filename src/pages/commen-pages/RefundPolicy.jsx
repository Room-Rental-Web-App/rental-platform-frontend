import React from "react";
import {
  CircleDollarSign,
  CalendarX,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";
import "../../css/LegalPages.css";

const RefundPolicy = () => {
  return (
    <div className="legal-container">
      {/* Hero Section */}
      <section className="legal-hero">
        <h1>
          Refund <span className="highlight">Policy</span>
        </h1>
        <p className="last-updated">Last Updated: January 2026</p>
      </section>

      <div className="legal-body">
        {/* Intro Alert Box */}
        <div className="alert-box">
          <CircleDollarSign size={24} />
          <p>
            We value your trust. Please read our refund terms regarding premium
            memberships and services carefully.
          </p>
        </div>

        {/* 1. Membership Refunds */}
        <div className="legal-card">
          <div className="card-header">
            <CalendarX className="icon-orange" />
            <h3>1. Premium Membership Refunds</h3>
          </div>
          <p>
            Generally, all payments for RoomsDekho Premium are{" "}
            <strong>non-refundable</strong>. Once the premium features are
            activated on your account, the service is considered consumed.
          </p>
        </div>

        {/* 2. Exceptions Section */}
        <div className="legal-card special-highlight">
          <div className="card-header">
            <RefreshCcw className="icon-orange" />
            <h3>2. Exceptional Cases</h3>
          </div>
          <p>Refunds may be considered only in the following scenarios:</p>
          <ul className="legal-list">
            <li>
              Technical failures where the premium features were never activated
              despite successful payment.
            </li>
            <li>
              Duplicate payments made due to a technical glitch on our platform.
            </li>
          </ul>
        </div>

        {/* 3. Refund Process */}
        <div className="legal-card">
          <div className="card-header">
            <ShieldCheck className="icon-orange" />
            <h3>3. Refund Process</h3>
          </div>
          <p>
            If you believe you are eligible for a refund under the exceptional
            cases, please contact our support team at{" "}
            <strong>support@roomsdekho.com</strong> within 48 hours of the
            transaction. Approved refunds will be processed within 5-7 working
            days.
          </p>
        </div>

        {/* 4. Cancellation */}
        <div className="legal-card">
          <div className="card-header">
            <CalendarX className="icon-orange" />
            <h3>4. Cancellation Policy</h3>
          </div>
          <p>
            You can cancel your subscription at any time; however, you will
            continue to have access to premium features until the end of your
            current billing period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
