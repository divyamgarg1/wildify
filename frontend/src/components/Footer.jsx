import React from "react";
import "./Footer.css"; // Ensure this import is present if not already

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>
      <button className="copy-btn">
        © {new Date().getFullYear()} Wildlife Research. All rights reserved.
      </button>
    </footer>
  );
};

export default Footer;
