import "../../css/premium.css";

export default function PremiumOwner() {
  return (
    <div className="premium-page owner">
      <h1>Owner Business Plan</h1>
      <p className="sub">Turn your room into a full-time income source.</p>

      <div className="plans">
        <div className="plan">
          <h2>FREE</h2>
          <ul>
            <li>Add only 1 Listing</li>
            <li>No Featured Display</li>
            <li>Manual Approval</li>
            <li>No WhatsApp Leads</li>
          </ul>
          <span>₹0</span>
        </div>

        <div className="plan premium">
          <h2>BUSINESS</h2>
          <ul>
            <li>Unlimited Listings</li>
            <li>Featured Listing on Top</li>
            <li>Verified Owner Badge</li>
            <li>WhatsApp Leads</li>
            <li>Priority Approval</li>
            <li>Lead Analytics</li>
          </ul>
          <span>₹499 / Month</span>
          <button>Become Premium</button>
        </div>
      </div>
    </div>
  );
}
