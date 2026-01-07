import React from "react";
import "../../css/premium.css";
import { ShieldCheck, Clock, MapPin, Star, Lock, Zap } from "lucide-react";
import RazorPayConfig from "../../components/RazorPayConfig";

export default function PremiumUser() {
  return (
    <div className="premium-container premium-user">

      <div className="compare-table">
        <h2>Free User vs Premium User</h2>

        <table>
          <thead>
            <tr>
              <th>Features</th>
              <th>Free User</th>
              <th className="premium-col">Premium User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Verified Owners</td>
              <td>Random Listings</td>
              <td className="premium-col">Only Verified Owners</td>
            </tr>
            <tr>
              <td>Early Access</td>
              <td>Not Available</td>
              <td className="premium-col">24 Hour Early Access</td>
            </tr>
            <tr>
              <td>Contact Details</td>
              <td>Hidden</td>
              <td className="premium-col">Unlocked</td>
            </tr>
            <tr>
              <td>Radius Search</td>
              <td>Not Available</td>
              <td className="premium-col">Within 1 KM</td>
            </tr>
            <tr>
              <td>Booking Requests</td>
              <td>Call Only</td>
              <td className="premium-col">Instant Request</td>
            </tr>
            <tr>
              <td>Best Deals</td>
              <td>Often Gone</td>
              <td className="premium-col">First Access</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className="main-title">Stop Wasting Time on Fake Rooms</h1>
      <p className="sub-text">
        73% of free users contact outdated or fake listings. Premium users don’t.
      </p>

      <div className="blocked-box">
        <Lock size={20} />
        <span>You are seeing LIMITED rooms. Upgrade to unlock full access.</span>
      </div>

      <div className="premium-grid">

        <div className="premium-card">
          <ShieldCheck />
          <h3>Only Verified Owners</h3>
          <p>No brokers, no fake listings. 100% Aadhaar & admin verified.</p>
        </div>

        <div className="premium-card">
          <Clock />
          <h3>Early Access Rooms</h3>
          <p>See new rooms 24 hours before public users.</p>
        </div>

        <div className="premium-card">
          <MapPin />
          <h3>Nearby Radius Search</h3>
          <p>Search rooms within 500m–1km radius.</p>
        </div>

        <div className="premium-card">
          <Star />
          <h3>Unlock Contact Details</h3>
          <p>Direct phone numbers. No middlemen. No spam.</p>
        </div>

        <div className="premium-card highlight">
          <Zap />
          <h3>Instant Booking Request</h3>
          <p>Send booking request & lock availability instantly.</p>
        </div>

      </div>

      <div className="pricing-box">
        <h2>Premium User Plan</h2>

        <p className="price">₹99 / Month</p>
        <p className="strike">Free users miss 80% of real rooms</p>
        <RazorPayConfig amountToPay={99} value={"Make Preminum"} />
        <p className="guarantee">7-day money-back guarantee</p>
      </div>

    </div>
  );
}
