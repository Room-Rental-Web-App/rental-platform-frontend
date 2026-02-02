import React from "react";
import "../../css/premium.css";
import { TrendingUp, Shield, Crown, Home, Lock, Zap } from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import {
  premiumOwnerFeatures,
  premiumOwnerPlans,
} from "../../data/roomsDekhoData";
import MyPlans from "../../components/MyPlans";

export default function OwnerPremium() {
  // 1. Hook se destructing sahi kari (premium, planCode, endDate, refresh)
  const { premium, planCode, endDate, refresh, loading } = usePremiumStatus();

  if (loading) return <div className="loader">Verifying your status...</div>;

  return (
    <div className="premium-container owner-premium">
      {/* 2. Banner Logic Fixed */}
      {premium && (
        <div className="premium-active-banner">
          <Crown size={18} />
          You are a <b>Premium Owner</b> until{" "}
          {new Date(endDate).toDateString()}
        </div>
      )}

      <MyPlans />

      {/* COMPARISON TABLE */}
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
              <td className="premium-col">Unlimited Rooms</td>
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
            <tr>
              <td>Booking Requests</td>
              <td>Spam Calls</td>
              <td className="premium-col">Serious Tenants Only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className="main-title">Your Room Is Invisible Right Now</h1>
      <p className="sub-text">
        Free listings get buried. Premium rooms get booked.
      </p>

      {/* 3. Blocked box logic: Hide if already premium */}
      {!premium && (
        <div className="blocked-box owner-block">
          <Lock size={20} />
          <span>Your room is currently hidden under premium listings.</span>
        </div>
      )}

      {/* FEATURE GRID */}
      <div className="premium-grid">
        {premiumOwnerFeatures.map((f, i) => (
          <div key={i} className="premium-card highlight">
            <Crown /> <h3>{f}</h3>
            <p>Premium feature benefit</p>
          </div>
        ))}
      </div>

      {/* PLANS */}
      <div className="pricing-dual owner-price">
        {premiumOwnerPlans.map((plan) => {
          // 4. Checking current plan correctly
          const isCurrent = planCode === plan.code;
          const hierarchy = [
            "OWNER_TRIAL",
            "OWNER_1M",
            "OWNER_6M",
            "OWNER_12M",
          ];

          // Disable lower plans logic
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
              <p className="price">
                ₹{plan.amount} <span>/ {plan.duration}</span>
              </p>

              <ul>
                {premiumOwnerFeatures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              {/* 5. ADDED onSuccess={refresh} trigger */}
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
