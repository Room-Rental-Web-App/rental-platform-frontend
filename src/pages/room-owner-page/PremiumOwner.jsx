import React, { useState } from "react";
import "../../CSS/premium.css";
import "../../CSS/premiumModel.css";
import {
  TrendingUp,
  Shield,
  Crown,
  Home,
  Lock,
  Zap,
  CheckCircle,
  X,
  Calendar,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import useRazorPay from "../../customHook/useRazorPay";
import {
  premiumOwnerPlans,
  premiumOwnerFeatures,
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

          <h3>2. Listing Rights</h3>
          <p>
            As a Premium Owner, you are allowed to list up to the room limit
            specified in your plan. Listings must be genuine and accurate. Fake
            or misleading listings will result in immediate termination without
            refund.
          </p>

          <h3>3. Plan Activation</h3>
          <p>
            Your premium plan will be activated immediately upon successful
            payment. You will get full access to all owner features for the
            chosen duration.
          </p>

          <h3>4. Visibility &amp; Ranking</h3>
          <p>
            Premium owners appear at the top of search results and are featured
            on the homepage. Ranking is subject to platform algorithms and may
            vary based on listing quality and activity.
          </p>

          <h3>5. Plan Renewal &amp; Expiry</h3>
          <p>
            Plans do not auto-renew. You must manually renew or upgrade before
            expiry to retain premium access. Upon expiry, your listings revert
            to the free tier limit of 2 rooms.
          </p>

          <h3>6. Refund Policy</h3>
          <p>
            All purchases are final. Refunds are only issued in case of a
            verified technical failure on our end. Raise a support ticket within
            48 hours for refund eligibility.
          </p>

          <h3>7. Privacy &amp; Security</h3>
          <p>
            Your payment information is never stored on our servers. We use
            industry-standard encryption for all transactions. Your personal
            data is handled as per our Privacy Policy.
          </p>

          <h3>8. Termination</h3>
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
export default function OwnerPremium() {
  const { premium, planCode, endDate, refresh, loading } = usePremiumStatus();
  const { toasts, addToast, removeToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // ✅ useRazorPay hook — T&C accept ke baad seedha payment open hoti hai
  const { triggerPayment } = useRazorPay(
    () => {
      refresh();
      addToast(
        "🎉 Payment successful! Your owner plan is now active.",
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
    setTimeout(() => {
      triggerPayment({
        amountToPay: selectedPlan.amount,
        planCode: selectedPlan.code,
      });
    }, 300);
  };

  const getRoomLimit = (code) => {
    if (code.includes("TRIAL")) return 3;
    if (code.includes("1M")) return 6;
    if (code.includes("6M")) return 15;
    if (code.includes("12M")) return 40;
    return 2;
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

  const getBadgeColor = (limit) => {
    if (limit >= 40) return "gold";
    if (limit >= 15) return "purple";
    if (limit >= 6) return "blue";
    return "orange";
  };

  if (loading) return <MyLoader data={"Verifying your premium status..."} />;

  return (
    <div className="premium-container owner-premium">
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

      <MyPlans />

      <div className="compare-table">
        <h2>Free vs Premium Owner</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                <th>
                  <div className="table-header-cell">
                    <X size={16} className="icon-red" /> Free Owner
                  </div>
                </th>
                <th className="premium-col">
                  <div className="table-header-cell">
                    <Crown size={16} /> Premium Owner
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

      <div className="title-section">
        <h1 className="main-title gradient-text">
          Your Room Is Invisible Right Now
        </h1>
        <p className="sub-text">
          Free listings get buried. Premium rooms get booked faster.
        </p>
      </div>

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
              {isCurrent && (
                <div className="current-badge">
                  <Crown size={12} /> Current Plan
                </div>
              )}
              {plan.code === "OWNER_1M" && !isCurrent && (
                <div className="popular-badge">
                  <TrendingUp size={12} /> Most Popular
                </div>
              )}

              <h2 className="plan-title">{plan.label}</h2>

              <div className={`limit-badge-card ${badgeColor}`}>
                <Home size={14} />
                <span>Allows {currentLimit} Rooms</span>
              </div>

              <p className="price">
                ₹{formatPrice(plan.amount)}{" "}
                <span className="duration">/ {plan.duration}</span>
              </p>

              <ul className="plan-feature-list">
                {features.map((f, index) => (
                  <li key={index}>
                    <CheckCircle size={14} className="check-icon" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* ✅ Button opens T&C modal — payment triggers after acceptance */}
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
                  You're already on {planCode.replace("OWNER_", "")} plan
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
