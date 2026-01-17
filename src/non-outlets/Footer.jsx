import React from 'react'
import "../css/footer.css"
import { Facebook, Home, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Home size={32} />
            <span>RoomsDekho</span>
          </div>
          <p className="footer-text">
            Your trusted partner in finding the perfect rental home across India. We make renting simple, safe, and hassle-free.
          </p>
          <div className="social-icons">
            <div className="social-icon">
              <Facebook size={20} />
            </div>
            <div className="social-icon">
              <Twitter size={20} />
            </div>
            <div className="social-icon">
              <Instagram size={20} />
            </div>
            <div className="social-icon">
              <Linkedin size={20} />
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links">
            <a className="footer-link">About Us</a>
            <a className="footer-link">Properties</a>
            <a className="footer-link">Blog</a>
            <a className="footer-link">Career</a>
            <a className="footer-link" href="/contact">Contact</a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <div className="footer-links">
            <a className="footer-link">Help Center</a>
            <a className="footer-link">FAQs</a>
            <a className="footer-link">Terms of Service</a>
            <a className="footer-link">Privacy Policy</a>
            <a className="footer-link">Refund Policy</a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <div className="footer-links">
            <a className="footer-link" >
              <Phone size={16} />
              +91 98765 43210
            </a>
            <a className="footer-link" >
              <Mail size={16} />
              info@roomsdekho.com
            </a>
            <a className="footer-link" >
              <MapPin size={16} />
              Mumbai, Maharashtra
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 RoomsDekho. All rights reserved. | Designed with ❤️ for renters across India</p>
      </div>
    </footer>

  )
}

export default Footer