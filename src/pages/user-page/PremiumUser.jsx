import React from "react";
import "../../css/premium.css";
import {
  Lock,
  Zap,
  Crown,
  CheckCircle,
  Loader,
  X,
  Calendar,
  Clock,
  Shield,
  TrendingUp,
} from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import {
  premiumUserFeatures,
  premiumUserPlans,
} from "../../data/roomsDekhoData";
import MyPlans from "../../components/MyPlans";
import MyLoader from "../../components/MyLoader";

export default function PremiumUser() {
  const { premium, planCode, endDate, loading, refresh } = usePremiumStatus();

  // Helper function to format price with commas
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  // Helper function to format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to calculate days remaining
  const getDaysRemaining = (dateString) => {
    const end = new Date(dateString);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) return <MyLoader  data={"Verifying your premium status..."}/>


  return (
    <div className="premium-container premium-user">
      {/* Premium Active Banner with Days Remaining */}
      {premium && (
        <div className="premium-active-banner">
          <Crown size={20} />
          <div className="banner-content">
            <span>
              You are a <strong>Premium User</strong>
            </span>
            <div className="banner-expiry">
              <Calendar size={14} />
              <span>Valid until {formatDate(endDate)}</span>
              <span className="days-badge">
                <Clock size={12} />
                {getDaysRemaining(endDate)} days left
              </span>
            </div>
          </div>
        </div>
      )}

      {/* My Plans Component */}
      <MyPlans />

      {/* Comparison Table */}
      <div className="compare-table">
        <h2>Free User vs Premium User</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                <th>
                  <div className="table-header-cell">
                    <X size={16} className="icon-red" />
                    Free User
                  </div>
                </th>
                <th className="premium-col">
                  <div className="table-header-cell">
                    <Crown size={16} />
                    Premium User
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Verified Owners</td>
                <td>
                  <div className="feature-text">
                    <span>Random Listings</span>
                  </div>
                </td>
                <td className="premium-col">
                  <div className="feature-text">
                    <CheckCircle size={16} className="inline-icon" />
                    <span>Only Verified Owners</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Early Access</td>
                <td>
                  <div className="feature-text">
                    <X size={16} className="icon-red" />
                    <span>Not Available</span>
                  </div>
                </td>
                <td className="premium-col">
                  <div className="feature-text">
                    <CheckCircle size={16} className="inline-icon" />
                    <span>24 Hour Early Access</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Contact Details</td>
                <td>
                  <div className="feature-text">
                    <span>Hidden</span>
                  </div>
                </td>
                <td className="premium-col">
                  <div className="feature-text">
                    <CheckCircle size={16} className="inline-icon" />
                    <span>Unlocked</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Radius Search</td>
                <td>
                  <div className="feature-text">
                    <X size={16} className="icon-red" />
                    <span>Not Available</span>
                  </div>
                </td>
                <td className="premium-col">
                  <div className="feature-text">
                    <CheckCircle size={16} className="inline-icon" />
                    <span>Within 1 KM</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Booking Requests</td>
                <td>
                  <div className="feature-text">
                    <span>Call Only</span>
                  </div>
                </td>
                <td className="premium-col">
                  <div className="feature-text">
                    <CheckCircle size={16} className="inline-icon" />
                    <span>Instant Request</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Best Deals</td>
                <td>
                  <div className="feature-text">
                    <span>Often Gone</span>
                  </div>
                </td>
                <td className="premium-col">
                  <div className="feature-text">
                    <CheckCircle size={16} className="inline-icon" />
                    <span>First Access</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="title-section">
        <h1 className="main-title gradient-text">
          Stop Wasting Time on Fake Rooms
        </h1>
        <p className="sub-text">
          73% of free users contact outdated or fake listings. Premium users
          don't.
        </p>
      </div>

      {/* Blocked Notice for Non-Premium Users */}
      {!premium && (
        <div className="blocked-box owner-block">
          <Lock size={22} />
          <div className="blocked-content">
            <strong>You are seeing LIMITED rooms.</strong>
            <p>Upgrade to unlock full access to verified listings!</p>
          </div>
        </div>
      )}

      {/* Feature Grid */}
      <div className="premium-grid">
        {premiumUserFeatures.map((feature, index) => (
          <div key={index} className="premium-card">
            <Zap size={32} style={{ color: "var(--primary)" }} />
            <h3>{feature}</h3>
            <p>Premium user benefit</p>
          </div>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="pricing-dual owner-price">
        {premiumUserPlans.map((plan) => {
          const isCurrent = planCode === plan.code;
          const hierarchy = ["USER_1M", "USER_6M", "USER_12M"];
          const disable =
            premium &&
            hierarchy.indexOf(plan.code) < hierarchy.indexOf(planCode);

          return (
            <div
              key={plan.code}
              className={`pricing-box ${isCurrent ? "current premium-highlight" : ""} ${disable ? "disabled-plan" : ""}`}
            >
              {/* Current Badge */}
              {isCurrent && (
                <div className="current-badge">
                  <Crown size={12} /> Current Plan
                </div>
              )}

              {/* Most Popular Badge */}
              {plan.code === "USER_6M" && !isCurrent && (
                <div className="popular-badge">
                  <TrendingUp size={12} /> Most Popular
                </div>
              )}

              {/* Plan Title */}
              <h2 className="plan-title">{plan.label}</h2>

              {/* Price */}
              <p className="price">
                ₹{formatPrice(plan.amount)}{" "}
                <span className="duration">/ {plan.duration}</span>
              </p>

              {/* Features List */}
              <ul className="plan-feature-list">
                {premiumUserFeatures.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={14} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              {!disable ? (
                <RazorPayConfig
                  amountToPay={plan.amount}
                  planCode={plan.code}
                  onSuccess={refresh}
                  value={
                    isCurrent
                      ? "Extend Plan"
                      : premium
                        ? "Upgrade Plan"
                        : "Get Premium"
                  }
                />
              ) : (
                <button className="btn-disabled" disabled>
                  <Shield size={16} />
                  Active on Higher Plan
                </button>
              )}

              {/* Disabled Notice */}
              {disable && (
                <div className="disabled-note">
                  You're already on {planCode.replace("USER_", "")} plan
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      <div className="trust-section">
        <div className="trust-item">
          <Shield size={24} className="trust-icon" />
          <div>
            <strong>Secure Payment</strong>
            <p>100% safe & encrypted transactions</p>
          </div>
        </div>
        <div className="trust-item">
          <Zap size={24} className="trust-icon" />
          <div>
            <strong>Instant Activation</strong>
            <p>Your plan activates immediately</p>
          </div>
        </div>
        <div className="trust-item">
          <CheckCircle size={24} className="trust-icon" />
          <div>
            <strong>Verified Listings</strong>
            <p>Access only genuine property owners</p>
          </div>
        </div>
      </div>
    </div>
  );
}
