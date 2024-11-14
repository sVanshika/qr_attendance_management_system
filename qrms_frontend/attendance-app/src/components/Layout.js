// Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#004080', color: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
          BITS Attendance
        </Link>
        <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
          <li style={{ marginLeft: '1.5rem' }}><Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Home</Link></li>
          <li style={{ marginLeft: '1.5rem' }}><Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>About</Link></li>
          <li style={{ marginLeft: '1.5rem' }}><Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Contact</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#ffffff' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#004080', color: '#fff', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2024 BITS QR Attendance System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
