import React, { useState } from "react";
import "../../CSS/premium.css";
import "../../CSS/premiumModel.css";
import {
  Lock,
  Zap,
  Crown,
  CheckCircle,
  X,
  Calendar,
  Clock,
  Shield,
  TrendingUp,
  AlertCircle,
  FileText,
} from "lucide-react";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import useRazorPay from "../../customHook/useRazorPay";
import {
  premiumUserFeatures,
  premiumUserPlans,
} from "../../data/roomsDekhoData";
import MyPlans from "../../components/MyPlans";
import MyLoader from "../../components/MyLoader";

// ─── Toast Component ───────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" && <CheckCircle size={18} />}
            {toast.type === "error" && <X size={18} />}
            {toast.type === "info" && <AlertCircle size={18} />}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── useToast Hook ─────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  return { toasts, addToast, removeToast };
}

// ─── Terms & Conditions Modal ─────────────────────────────────────────────────
function TermsModal({ plan, onAccept, onClose, formatPrice }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <FileText size={22} />
            <h2>Terms &amp; Conditions</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-plan-summary">
          <Crown size={16} />
          <span>
            You are purchasing <strong>{plan.label}</strong> — ₹
            {formatPrice(plan.amount)} / {plan.duration}
          </span>
        </div>

        <div className="modal-terms-body">
          <h3>1. Subscription &amp; Payment</h3>
          <p>
            By proceeding, you agree to pay ₹{formatPrice(plan.amount)} for the{" "}
            {plan.label} plan. Payments are processed securely via Razorpay and
            are non-refundable once the plan is activated.
          </p>

          <h3>2. Plan Activation</h3>
          <p>
            Your premium plan will be activated immediately upon successful
            payment. You will get full access to all premium features for the
            chosen duration.
          </p>

          <h3>3. Features &amp; Access</h3>
          <p>
            Premium access includes verified owner listings, 24-hour early
            access, unlocked contact details, radius search, instant booking
            requests, and first access to best deals. Features are subject to
            change with prior notice.
          </p>

          <h3>4. Plan Renewal &amp; Expiry</h3>
          <p>
            Plans do not auto-renew. You must manually renew or upgrade before
            expiry to retain premium access. Upon expiry, your account reverts
            to the free tier.
          </p>

          <h3>5. Refund Policy</h3>
          <p>
            All purchases are final. Refunds are only issued in case of a
            verified technical failure on our end. Raise a support ticket within
            48 hours for refund eligibility.
          </p>

          <h3>6. Privacy</h3>
          <p>
            Your payment information is never stored on our servers. We use
            industry-standard encryption for all transactions. Your personal
            data is handled as per our Privacy Policy.
          </p>

          <h3>7. Termination</h3>
          <p>
            RoomsDekho reserves the right to terminate premium access without
            refund if the account violates our community guidelines or terms of
            service.
          </p>
        </div>

        <label className="modal-accept-label">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>
            I have read and agree to the <strong>Terms &amp; Conditions</strong>{" "}
            and <strong>Privacy Policy</strong>
          </span>
        </label>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn-proceed ${!accepted ? "btn-proceed-disabled" : ""}`}
            disabled={!accepted}
            onClick={() => accepted && onAccept()}
          >
            <Shield size={16} />
            Accept &amp; Pay ₹{formatPrice(plan.amount)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PremiumUser() {
  const { premium, planCode, endDate, loading, refresh } = usePremiumStatus();
  const { toasts, addToast, removeToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // ✅ useRazorPay hook — T&C accept hone ke baad seedha payment trigger hoti hai
  const { triggerPayment } = useRazorPay(
    () => {
      refresh();
      addToast(
        "🎉 Payment successful! Your premium plan is now active.",
        "success",
        6000,
      );
    },
    (reason) => {
      if (reason === "dismissed") {
        addToast("Payment cancelled.", "info");
      } else if (reason === "verify") {
        addToast(
          "Payment verification failed. Please contact support.",
          "error",
        );
      } else {
        addToast("Payment could not start. Please try again.", "error");
      }
    },
  );

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleAccept = () => {
    setModalOpen(false);
    addToast("Terms accepted! Opening payment…", "info", 2000);
    // 300ms delay: modal smoothly close ho phir Razorpay open ho
    setTimeout(() => {
      triggerPayment({
        amountToPay: selectedPlan.amount,
        planCode: selectedPlan.code,
      });
    }, 300);
  };

  const formatPrice = (amount) => new Intl.NumberFormat("en-IN").format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getDaysRemaining = (dateString) => {
    const diffDays = Math.ceil(
      (new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) return <MyLoader data={"Verifying your premium status..."} />;

  return (
    <div className="premium-container premium-user">
      <Toast toasts={toasts} removeToast={removeToast} />

      {modalOpen && selectedPlan && (
        <TermsModal
          plan={selectedPlan}
          onAccept={handleAccept}
          onClose={() => setModalOpen(false)}
          formatPrice={formatPrice}
        />
      )}

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

      <MyPlans />

      <div className="compare-table">
        <h2>Free User vs Premium User</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                <th>
                  <div className="table-header-cell">
                    <X size={16} className="icon-red" /> Free User
                  </div>
                </th>
                <th className="premium-col">
                  <div className="table-header-cell">
                    <Crown size={16} /> Premium User
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Verified Owners", "Random Listings", "Only Verified Owners"],
                ["Early Access", "Not Available", "24 Hour Early Access"],
                ["Contact Details", "Hidden", "Unlocked"],
                ["Radius Search", "Not Available", "Within 1 KM"],
                ["Booking Requests", "Call Only", "Instant Request"],
                ["Best Deals", "Often Gone", "First Access"],
              ].map(([feature, freeVal, premVal]) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  <td>
                    <div className="feature-text">
                      {[
                        "Not Available",
                        "Hidden",
                        "Call Only",
                        "Often Gone",
                        "Random Listings",
                      ].includes(freeVal) && (
                        <X size={16} className="icon-red" />
                      )}
                      <span>{freeVal}</span>
                    </div>
                  </td>
                  <td className="premium-col">
                    <div className="feature-text">
                      <CheckCircle size={16} className="inline-icon" />
                      <span>{premVal}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="title-section">
        <h1 className="main-title gradient-text">
          Stop Wasting Time on Fake Rooms
        </h1>
        <p className="sub-text">
          73% of free users contact outdated or fake listings. Premium users
          don't.
        </p>
      </div>

      {!premium && (
        <div className="blocked-box owner-block">
          <Lock size={22} />
          <div className="blocked-content">
            <strong>You are seeing LIMITED rooms.</strong>
            <p>Upgrade to unlock full access to verified listings!</p>
          </div>
        </div>
      )}

      <div className="premium-grid">
        {premiumUserFeatures.map((feature, index) => (
          <div key={index} className="premium-card">
            <Zap size={32} style={{ color: "var(--primary)" }} />
            <h3>{feature}</h3>
            <p>Premium user benefit</p>
          </div>
        ))}
      </div>

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
              {isCurrent && (
                <div className="current-badge">
                  <Crown size={12} /> Current Plan
                </div>
              )}
              {plan.code === "USER_6M" && !isCurrent && (
                <div className="popular-badge">
                  <TrendingUp size={12} /> Most Popular
                </div>
              )}

              <h2 className="plan-title">{plan.label}</h2>
              <p className="price">
                ₹{formatPrice(plan.amount)}{" "}
                <span className="duration">/ {plan.duration}</span>
              </p>

              <ul className="plan-feature-list">
                {premiumUserFeatures.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={14} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {!disable ? (
                <button
                  className="btn-get-premium"
                  onClick={() => handlePlanClick(plan)}
                >
                  <Crown size={16} />
                  {isCurrent
                    ? "Extend Plan"
                    : premium
                      ? "Upgrade Plan"
                      : "Get Premium"}
                </button>
              ) : (
                <button className="btn-disabled" disabled>
                  <Shield size={16} /> Active on Higher Plan
                </button>
              )}

              {disable && (
                <div className="disabled-note">
                  You're already on {planCode.replace("USER_", "")} plan
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="trust-section">
        <div className="trust-item">
          <Shield size={24} className="trust-icon" />
          <div>
            <strong>Secure Payment</strong>
            <p>100% safe &amp; encrypted transactions</p>
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
