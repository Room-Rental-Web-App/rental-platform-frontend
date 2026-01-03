import "../../css/premium.css";

export default function PremiumUser() {
  return (
    <div className="premium-page">
      <h1>RoomsDekho Premium</h1>
      <p className="sub">Get rooms faster. Save money. Skip the crowd.</p>

      <div className="plans">
        <div className="plan">
          <h2>FREE</h2>
          <ul>
            <li>Limited Contact</li>
            <li>Limited Wishlist</li>
            <li>Normal Search</li>
            <li>Ads Shown</li>
          </ul>
          <span>₹0 / Month</span>
        </div>

        <div className="plan premium">
          <h2>PREMIUM</h2>
          <ul>
            <li>Unlimited Owner Contact</li>
            <li>WhatsApp Direct Chat</li>
            <li>Early Room Access</li>
            <li>Price Drop Alerts</li>
            <li>No Ads</li>
            <li>Priority Support</li>
          </ul>
          <span>₹199 / Month</span>
          <button>Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}
