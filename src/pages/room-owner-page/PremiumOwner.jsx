import React from "react";
import "../../css/premium.css";
import { TrendingUp, Shield, Crown, Home, Lock, Zap } from "lucide-react";

export default function OwnerPremium() {
  return (
    <div className="premium-container owner-premium">

      {/* Comparison Table */}
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

      <div className="blocked-box owner-block">
        <Lock size={20} />
        <span>Your room is currently hidden under premium listings.</span>
      </div>

      <div className="premium-grid">

        <div className="premium-card highlight">
          <Crown />
          <h3>Featured Placement</h3>
          <p>Appear on homepage & top search results. Get 5x more views.</p>
        </div>

        <div className="premium-card highlight">
          <Crown />
          <h3>Add More Rooms</h3>
          <p>Free: 2 | Featured: 10 | Banner: Unlimited</p>
        </div>

        <div className="premium-card">
          <Shield />
          <h3>Verified Owner Badge</h3>
          <p>Aadhaar & admin verified badge increases trust.</p>
        </div>

        <div className="premium-card">
          <TrendingUp />
          <h3>Priority Ranking</h3>
          <p>Your rooms appear before all free listings.</p>
        </div>

        <div className="premium-card">
          <Home />
          <h3>Instant Booking Requests</h3>
          <p>Only serious tenants can contact you.</p>
        </div>

        <div className="premium-card">
          <Zap />
          <h3>Higher Conversion</h3>
          <p>Premium owners get 3–5x more enquiries.</p>
        </div>

      </div>

      <div className="pricing-box owner-price">
        <h2>Featured Owner Plan</h2>
        <p className="price">₹199 / 7 Days</p>
        <p className="strike">Free rooms stay buried</p>
        <button className="upgrade-btn owner">Boost My Listing Now</button>
        <p className="guarantee">Get booked or get your money back.</p>
      </div>

    </div>
  );
}
