import React, { useState } from "react";
import { Check, Crown, Star, Zap, ShieldCheck } from "lucide-react";
import "../../css/PremiumPlans.css";
import { Link } from "react-router-dom";

const PremiumPlans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Silver",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: ["5 Contact Views", "Basic Support", "Standard Listing"],
      icon: <Zap className="icon-silver" />,
      color: "silver-card",
    },
    {
      name: "Gold",
      monthlyPrice: 499,
      yearlyPrice: 4500,
      features: [
        "Unlimited Contacts",
        "Verified Badge",
        "Priority Support",
        "Top Search Results",
      ],
      icon: <Crown className="icon-gold" />,
      color: "gold-card",
      recommended: true,
    },
    {
      name: "Platinum",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      features: [
        "Enterprise Access",
        "Dedicated Manager",
        "Bulk Listings",
        "API Access",
      ],
      icon: <ShieldCheck className="icon-platinum" />,
      color: "platinum-card",
    },
  ];

  return (
    <div className="premium-container">
      <div className="premium-header">
        <h1>
          Elevate Your Experience with{" "}
          <span className="text-gold">Premium</span>
        </h1>
        <p>
          Choose a plan that fits your needs and start finding better homes
          today.
        </p>

        {/* Toggle Switch */}
        <div className="toggle-container">
          <span className={!isYearly ? "active-period" : ""}>Monthly</span>
          <div className="toggle-switch" onClick={() => setIsYearly(!isYearly)}>
            <div
              className={`toggle-ball ${isYearly ? "ball-right" : "ball-left"}`}
            ></div>
          </div>
          <span className={isYearly ? "active-period" : ""}>
            Yearly <span className="save-badge">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card ${plan.color} ${
              plan.recommended ? "scale-up" : ""
            }`}
          >
            {plan.recommended && (
              <div className="recommended-tag">Most Popular</div>
            )}
            <div className="plan-icon">{plan.icon}</div>
            <h2>{plan.name}</h2>
            <div className="price-tag">
              {typeof plan.monthlyPrice === "number" ? (
                <>
                  <span className="currency">₹</span>
                  <span className="amount">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="period">/{isYearly ? "yr" : "mo"}</span>
                </>
              ) : (
                <span className="amount">{plan.monthlyPrice}</span>
              )}
            </div>
            <ul className="feature-list">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <Check size={18} /> {feature}
                </li>
              ))}
            </ul>
            <button className="btn-select">
              {plan.name === "Platinum" ? "Contact Us" : "Get Started"}
            </button>
          </div>
        ))}
      </div>

      <div className="footer-links">
        <p>
          By continuing, you agree to our
          <Link to="/premium-docs"> Terms & Conditions</Link>
        </p>
      </div>
    </div>
  );
};

export default PremiumPlans;
