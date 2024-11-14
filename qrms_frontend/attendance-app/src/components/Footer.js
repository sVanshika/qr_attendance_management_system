// src/components/Footer.js

import React from 'react';
import './Footer.css'; // Import CSS for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2024 BITS_QRAMS. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
