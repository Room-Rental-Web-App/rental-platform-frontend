import React from "react";
import "../../css/premium.css";
import {
  TrendingUp,
  Shield,
  Crown,
  Home,
  Lock,
  Zap,
  CheckCircle,
} from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";
import usePremiumStatus from "../../customHook/usePremiumStatus";
// Fix: Sirf wahi cheezein mangao jo roomsDekhoData mein export hain
import {
  premiumOwnerPlans,
  premiumOwnerFeatures,
} from "../../data/roomsDekhoData";
import MyPlans from "../../components/MyPlans";

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

  if (loading) return <div className="loader">Verifying your status...</div>;

  return (
    <div className="premium-container owner-premium">
      {premium && (
        <div className="premium-active-banner">
          <Crown size={18} />
          You are a <b>Premium Owner</b> until{" "}
          {new Date(endDate).toDateString()}
        </div>
      )}

      <MyPlans />

      <div className="compare-table">
        <h2>Free vs Premium Owner</h2>
        <table>
          <thead>
            <tr>
              <th>Features</th>
              <th>Free Owner</th>
              <th className="premium-col">Premium Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rooms Allowed</td>
              <td>2 Rooms Only</td>
              <td className="premium-col">Up to 40 Rooms (Based on Plan)</td>
            </tr>
            <tr>
              <td>Search Ranking</td>
              <td>Last in results</td>
              <td className="premium-col">Top Results</td>
            </tr>
            <tr>
              <td>Homepage Visibility</td>
              <td>Hidden</td>
              <td className="premium-col">Featured Banner</td>
            </tr>
            <tr>
              <td>Verified Badge</td>
              <td>Not Available</td>
              <td className="premium-col">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className="main-title">Your Room Is Invisible Right Now</h1>
      <p className="sub-text">
        Free listings get buried. Premium rooms get booked.
      </p>

      {!premium && (
        <div className="blocked-box owner-block">
          <Lock size={20} />
          <span>Your room is currently hidden under premium listings.</span>
        </div>
      )}

      <div className="pricing-dual owner-price">
        {premiumOwnerPlans.map((plan) => {
          const isCurrent = planCode === plan.code;
          const currentLimit = getRoomLimit(plan.code);
          const features = getPlanFeatures(plan);

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
              className={`pricing-box ${isCurrent ? "current premium main" : "trial"}`}
            >
              {isCurrent && <div className="current-badge">Current Plan</div>}
              {plan.code === "OWNER_1M" && (
                <div className="popular-badge">Most Popular</div>
              )}

              <h2>{plan.label}</h2>
              <div className="limit-badge-card">
                Allows {currentLimit} Rooms
              </div>
              <p className="price">
                ₹{plan.amount} <span>/ {plan.duration}</span>
              </p>

              <ul className="plan-feature-list">
                {features.map((f, index) => (
                  <li key={index}>
                    <CheckCircle size={14} className="check-icon" /> {f}
                  </li>
                ))}
              </ul>

              <RazorPayConfig
                amountToPay={plan.amount}
                planCode={plan.code}
                onSuccess={refresh}
                value={
                  isCurrent
                    ? "Extend Plan"
                    : premium
                      ? "Upgrade"
                      : "Get Premium"
                }
              />

              {disable && (
                <div className="disabled-note">Active on higher plan</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
