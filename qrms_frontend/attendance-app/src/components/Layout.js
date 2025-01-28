// Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userRole = sessionStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  const handleTitleClick = (e) => {
    e.preventDefault();
    if (isLoggedIn && userRole) {
      switch(userRole) {
        case 'student':
          navigate('/studentdashboard', {
            state: { id: userId, username: localStorage.getItem('username') }
          });
          break;
        case 'professor':
          navigate('/professordashboard', {
            state: { id: userId, username: localStorage.getItem('username') }
          });
          break;
        case 'admin':
          navigate('/admindashboard', {
            state: { id: userId, username: localStorage.getItem('username') }
          });
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#004080', color: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link 
          to="#" 
          onClick={handleTitleClick}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#fff', 
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          BITS Attendance
        </Link>
        <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0, alignItems: 'center' }}>
          {/* <li style={{ marginLeft: '1.5rem' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
          </li>
          <li style={{ marginLeft: '1.5rem' }}>
            <Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>About</Link>
          </li>
          <li style={{ marginLeft: '1.5rem' }}>
            <Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Contact</Link>
          </li> */}
          {isLoggedIn && (
            <li style={{ marginLeft: '1.5rem' }}>
              <button 
                onClick={handleLogout}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Logout
              </button>
            </li>
          )}
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
