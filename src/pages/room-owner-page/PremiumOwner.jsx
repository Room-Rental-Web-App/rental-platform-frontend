import React from "react";
import "../../CSS/premium.css";
import {
  TrendingUp,
  Shield,
  Crown,
  Home,
  Lock,
  Zap,
  CheckCircle,
  Loader,
  X,
  Calendar,
  Clock,
} from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import {
  premiumOwnerPlans,
  premiumOwnerFeatures,
} from "../../data/roomsDekhoData";
import MyPlans from "../../components/MyPlans";
import MyLoader from "../../components/MyLoader";

export default function OwnerPremium() {
  const { premium, planCode, endDate, refresh, loading } = usePremiumStatus();

  // Helper function to get room limit based on plan code
  const getRoomLimit = (code) => {
    if (code.includes("TRIAL")) return 3;
    if (code.includes("1M")) return 6;
    if (code.includes("6M")) return 15;
    if (code.includes("12M")) return 40;
    return 2; // Default for free
  };

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

  // Helper function to get dynamic features
  const getPlanFeatures = (plan) => {
    const limit = getRoomLimit(plan.code);
    return [
      `Add up to ${limit} Room Listings`,
      "Top position in search results",
      plan.code.includes("6M") || plan.code.includes("12M")
        ? "Featured owner badge"
        : "Verified owner badge",
      "Priority direct contact from tenants",
      "Spam / fake lead protection",
      plan.code.includes("12M")
        ? "Dedicated relationship manager"
        : "3–5x more enquiries",
    ];
  };

  // Get badge color based on room limit
  const getBadgeColor = (limit) => {
    if (limit >= 40) return "gold";
    if (limit >= 15) return "purple";
    if (limit >= 6) return "blue";
    return "orange";
  };

  if (loading) return <MyLoader data={"Verifying your premium status..."} />

  return (
    <div className="premium-container owner-premium">
      {/* Premium Active Banner with Days Remaining */}
      {premium && (
        <div className="premium-active-banner">
          <Crown size={20} />
          <div className="banner-content">
            <span>
              You are a <strong>Premium Owner</strong>
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
        <h2>Free vs Premium Owner</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                <th>
                  <div className="table-header-cell">
                    <X size={16} className="icon-red" />
                    Free Owner
                  </div>
                </th>
                <th className="premium-col">
                  <div className="table-header-cell">
                    <Crown size={16} />
                    Premium Owner
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rooms Allowed</td>
                <td>
                  <span className="feature-text">2 Rooms Only</span>
                </td>
                <td className="premium-col">
                  <CheckCircle size={16} className="inline-icon" />
                  <span className="feature-text">Up to 40 Rooms</span>
                </td>
              </tr>
              <tr>
                <td>Search Ranking</td>
                <td>
                  <span className="feature-text">Last in results</span>
                </td>
                <td className="premium-col">
                  <CheckCircle size={16} className="inline-icon" />
                  <span className="feature-text">Top Results</span>
                </td>
              </tr>
              <tr>
                <td>Homepage Visibility</td>
                <td>
                  <span className="feature-text">Hidden</span>
                </td>
                <td className="premium-col">
                  <CheckCircle size={16} className="inline-icon" />
                  <span className="feature-text">Featured Banner</span>
                </td>
              </tr>
              <tr>
                <td>Verified Badge</td>
                <td>
                  <X size={16} className="icon-red" />
                  <span className="feature-text">Not Available</span>
                </td>
                <td className="premium-col">
                  <CheckCircle size={16} className="inline-icon" />
                  <span className="feature-text">Yes</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="title-section">
        <h1 className="main-title gradient-text">
          Your Room Is Invisible Right Now
        </h1>
        <p className="sub-text">
          Free listings get buried. Premium rooms get booked faster.
        </p>
      </div>

      {/* Blocked Notice for Non-Premium Users */}
      {!premium && (
        <div className="blocked-box owner-block">
          <Lock size={22} />
          <div className="blocked-content">
            <strong>
              Your room is currently hidden under premium listings.
            </strong>
            <p>Upgrade now to appear at the top of search results!</p>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="pricing-dual owner-price">
        {premiumOwnerPlans.map((plan) => {
          const isCurrent = planCode === plan.code;
          const currentLimit = getRoomLimit(plan.code);
          const features = getPlanFeatures(plan);
          const badgeColor = getBadgeColor(currentLimit);

          const hierarchy = [
            "OWNER_TRIAL",
            "OWNER_1M",
            "OWNER_6M",
            "OWNER_12M",
          ];
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
              {plan.code === "OWNER_1M" && !isCurrent && (
                <div className="popular-badge">
                  <TrendingUp size={12} /> Most Popular
                </div>
              )}

              {/* Plan Title */}
              <h2 className="plan-title">{plan.label}</h2>

              {/* Room Limit Badge */}
              <div className={`limit-badge-card ${badgeColor}`}>
                <Home size={14} />
                <span>Allows {currentLimit} Rooms</span>
              </div>

              {/* Price */}
              <p className="price">
                ₹{formatPrice(plan.amount)}{" "}
                <span className="duration">/ {plan.duration}</span>
              </p>

              {/* Features List */}
              <ul className="plan-feature-list">
                {features.map((f, index) => (
                  <li key={index}>
                    <CheckCircle size={14} className="check-icon" />
                    <span>{f}</span>
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
                  You're already on {planCode.replace("OWNER_", "")} plan
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
          <TrendingUp size={24} className="trust-icon" />
          <div>
            <strong>3x More Leads</strong>
            <p>Premium owners get verified inquiries</p>
          </div>
        </div>
      </div>
    </div>
  );
}
