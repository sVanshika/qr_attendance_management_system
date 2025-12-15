import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // State hooks for form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error on each new input in email field
  };

  // Define handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Regex validation to ensure email contains "bits-pilani.ac.in"
    const emailRegex = /^[a-zA-Z0-9._%+-]+@pilani.bits-pilani\.ac\.in$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid BITS email address");
      return;
    }

    // Data to send in the request body
    const loginData = {
      role: role,
      email: email,
      password: password,
    };
   
    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // Add session management
        sessionStorage.setItem('userToken', result.id);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('userId', result.id);
        
        // Handle successful login (e.g., redirect to dashboard or home)
        console.log(result);
        console.log(result.message);
        navigate(`/${role}dashboard`, {state: { username: result.username, id: result.id}}); // Navigate to another page (you can change this)
        localStorage.setItem('userId', result.id);
        localStorage.setItem('username', result.username); // Save user ID to localStorage
      } else {
        // Handle failed login
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Login as {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Guest"}</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>

        {error && <div style={styles.error}>{error}</div>} {/* Display error if any */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  error: {
    marginTop: '1rem',
    color: 'red',
  },
};

export default LoginPage;
