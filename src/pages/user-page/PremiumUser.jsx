
import "../../css/premium.css";
import { ShieldCheck, Clock, MapPin, Star, Lock, Zap, Crown } from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import { premiumUserFeatures, premiumUserPlans } from "../../data/roomsDekhoData";

import MyPlans from "../../components/MyPlans";
export default function PremiumUser() {

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const status = usePremiumStatus(email, role);



  return (
    <div className="premium-container premium-user">

      {status?.premium && (
        <div className="premium-active-banner">
          <Crown size={18} /> You are Premium until {new Date(status.endDate).toDateString()}
        </div>
      )}
      <MyPlans />
      {/* Comparison Table */}
      <div className="compare-table">
        <h2>Free User vs Premium User</h2>
        <table>
          <thead>
            <tr><th>Features</th><th>Free User</th><th className="premium-col">Premium User</th></tr>
          </thead>
          <tbody>
            <tr><td>Verified Owners</td><td>Random Listings</td><td className="premium-col">Only Verified Owners</td></tr>
            <tr><td>Early Access</td><td>Not Available</td><td className="premium-col">24 Hour Early Access</td></tr>
            <tr><td>Contact Details</td><td>Hidden</td><td className="premium-col">Unlocked</td></tr>
            <tr><td>Radius Search</td><td>Not Available</td><td className="premium-col">Within 1 KM</td></tr>
            <tr><td>Booking Requests</td><td>Call Only</td><td className="premium-col">Instant Request</td></tr>
            <tr><td>Best Deals</td><td>Often Gone</td><td className="premium-col">First Access</td></tr>
          </tbody>
        </table>
      </div>

      <h1 className="main-title">Stop Wasting Time on Fake Rooms</h1>
      <p className="sub-text">73% of free users contact outdated or fake listings. Premium users don’t.</p>

      <div className="blocked-box">
        <Lock size={20} />
        <span>You are seeing LIMITED rooms. Upgrade to unlock full access.</span>
      </div>

      {/* Feature Grid */}
      <div className="premium-grid">
        {premiumUserFeatures.map((f, i) => (
          <div key={i} className="premium-card highlight">
            <Zap />
            <h3>{f}</h3>
            <p>Premium user benefit</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div className="pricing-dual owner-price">
        {premiumUserPlans.map(plan => {
          const isCurrent = status?.planCode === plan.code;
          const hierarchy = ["USER_1M", "USER_6M", "USER_12M"];
          const disable = status?.premium && hierarchy.indexOf(plan.code) <= hierarchy.indexOf(status.planCode);

          return (
            <div key={plan.code} className={`pricing-box ${isCurrent ? "current premium main" : "trial"}`}>
              {isCurrent && <div className="current-badge">Current Plan</div>}

              <h2>{plan.label}</h2>
              <p className="price">₹{plan.amount} <span>/ {plan.duration}</span></p>

              <ul>
                {premiumUserFeatures.map(f => <li key={f}>{f}</li>)}
              </ul>

              <RazorPayConfig
                amountToPay={plan.amount}
                value={isCurrent ? "Extend Plan" : status?.premium ? "Upgrade" : "Get Premium"}
              />

              {disable && <div className="disabled-note">Unavailable (lower plan)</div>}
            </div>
          );
        })}
      </div>

    </div>
  );
}
