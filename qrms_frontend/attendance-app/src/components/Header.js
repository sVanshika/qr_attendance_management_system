// src/components/Header.js

import React from 'react';
import './Header.css'; // Import CSS for header styling

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">BITS_QRAMS</h1>
        <nav className="nav">
          <ul>
            <li><a href="/">Home</a></li>

            <li><a href="/help">Help</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
