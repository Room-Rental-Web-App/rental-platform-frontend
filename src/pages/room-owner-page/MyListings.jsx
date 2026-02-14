import React from "react";
import "../../css/premium.css";
import {
  TrendingUp,
  Shield,
  Crown,
  Lock,
  Zap,
  CheckCircle,
  Info,
} from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import { premiumOwnerPlans } from "../../data/roomsDekhoData";
import MyPlans from "../../components/MyPlans";

export default function OwnerPremium() {
  const { premium, planCode, endDate, refresh, loading } = usePremiumStatus();

  const getRoomLimit = (code) => {
    if (code.includes("TRIAL")) return 3;
    if (code.includes("1M")) return 6;
    if (code.includes("6M")) return 15;
    if (code.includes("12M")) return 40;
    return 2;
  };

  if (loading)
    return (
      <div className="loader-full">
        <div className="spinner"></div>
        <p>Verifying Status...</p>
      </div>
    );

  return (
    <div className="premium-page-wrapper">
      {" "}
      {/* New Wrapper for Centering */}
      <div className="premium-content-center fade-in">
        {/* 1. Visibility Meter */}
        <div className="visibility-meter-box">
          <div className="meter-header">
            <div className="flex-center">
              <TrendingUp
                size={22}
                className={premium ? "text-success" : "text-error"}
              />
              <h3>
                Visibility Status:{" "}
                <span className={premium ? "text-success" : "text-error"}>
                  {premium ? "High" : "Low"}
                </span>
              </h3>
            </div>
          </div>
          <div className="meter-bar-bg">
            <div
              className="meter-bar-fill"
              style={{ width: premium ? "95%" : "15%" }}
            ></div>
          </div>
          <p className="meter-text">
            {premium
              ? "Your listings are ranking at the top!"
              : "Free listings are buried. You're missing out on 90% of tenant calls."}
          </p>
        </div>

        {premium && (
          <div className="premium-active-banner">
            <Crown size={20} />
            <span>
              Active Premium Owner until{" "}
              <b>{new Date(endDate).toDateString()}</b>
            </span>
          </div>
        )}

        <MyPlans />

        <div className="header-text-group text-center">
          <h1 className="main-title">Get More Calls, Rent Faster</h1>
          <p className="sub-text">
            Choose a plan that fits your property management needs.
          </p>
        </div>

        {/* 2. Comparison Checklist */}
        <div className="comparison-grid">
          <div className="comp-card">
            <h4>Free</h4>
            <ul>
              <li>
                <Lock size={14} /> 2 Listings
              </li>
              <li>
                <Lock size={14} /> Basic Ranking
              </li>
            </ul>
          </div>
          <div className="comp-card highlight">
            <h4>Premium</h4>
            <ul>
              <li>
                <CheckCircle size={14} /> Up to 40 Listings
              </li>
              <li>
                <CheckCircle size={14} /> Top Ranking
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Pricing Grid */}
        <div className="pricing-dual">
          {premiumOwnerPlans.map((plan) => {
            const isCurrent = planCode === plan.code;
            const isPopular = plan.code === "OWNER_1M";
            const hierarchy = [
              "OWNER_TRIAL",
              "OWNER_1M",
              "OWNER_6M",
              "OWNER_12M",
            ];
            const isLower =
              premium &&
              hierarchy.indexOf(plan.code) < hierarchy.indexOf(planCode);

            return (
              <div
                key={plan.code}
                className={`pricing-box ${isCurrent ? "current" : ""} ${isPopular ? "popular" : ""} ${isLower ? "lower" : ""}`}
              >
                {isPopular && <div className="popular-tag">BEST VALUE</div>}
                <h2>{plan.label}</h2>
                <div className="limit-pill">
                  Up to {getRoomLimit(plan.code)} Rooms
                </div>
                <div className="price-tag">
                  ₹{plan.amount} <span>/ {plan.duration}</span>
                </div>

                <ul className="plan-list">
                  <li>
                    <Zap size={14} className="zap" /> Top Position Rank
                  </li>
                  <li>
                    <Zap size={14} className="zap" /> Direct Inquiries
                  </li>
                </ul>

                <RazorPayConfig
                  amountToPay={plan.amount}
                  planCode={plan.code}
                  onSuccess={refresh}
                  value={
                    isCurrent ? "Extend" : premium ? "Upgrade" : "Select Plan"
                  }
                  disabled={isLower}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
