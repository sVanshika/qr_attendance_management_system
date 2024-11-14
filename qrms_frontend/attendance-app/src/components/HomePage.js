import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '50vh', backgroundColor: '#f4f4f4' }}>
      {/* Navbar */}
      {/* <nav style={{ backgroundColor: '#004080', color: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
          BITS Attendance
        </Link>
        <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
          <li style={{ marginLeft: '1.5rem' }}><Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Home</Link></li>
          <li style={{ marginLeft: '1.5rem' }}><Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>About</Link></li>
          <li style={{ marginLeft: '1.5rem' }}><Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Contact</Link></li>
        </ul>
      </nav> */}

      {/* Main Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>BITS QR Attendance Management System</h1>

        {/* Login Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login?role=admin">
            <button style={buttonStyle}>Log in as Admin</button>
          </Link>
          <Link to="/login?role=professor">
            <button style={buttonStyle} className="btn btn-primary">Log in as Professor</button>
          </Link>
          <Link to="/login?role=student">
            <button style={buttonStyle}>Log in as Student</button>
          </Link>
        </div>
      </div>

      {/* Footer
      <footer style={{ backgroundColor: '#004080', color: '#fff', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2024 BITS QR Attendance System. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  color: '#fff',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
};

export default HomePage;
