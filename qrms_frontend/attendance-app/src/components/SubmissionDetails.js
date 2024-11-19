// src/components/SubmissionDetails.js

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SubmissionDetails.css'; // Import the new CSS file

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Firebase configuration (ensure you add your config here)

const firebaseConfig = {
  apiKey: "AIzaSyA9segaD7vS8T4gQLAJOi86WgwtpeLB6nQ",
  authDomain: "qrams-33cf3.firebaseapp.com",
  projectId: "qrams-33cf3",
  storageBucket: "qrams-33cf3.firebasestorage.app",
  messagingSenderId: "533732520404",
  appId: "1:533732520404:web:48a9840e94315599632641",
  measurementId: "G-G75636Q2Y0"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the default app
}

const SubmissionDetails = () => {
  const location = useLocation();
  const { id, emailAddress, timestamp, responseMessage } = location.state || {};

  // State for managing sign-in status
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Check if the response message indicates an error
  const isError = responseMessage === 'Attendance not saved as student is not present in the course!';

  return (
    <div className="submission-details-container">
      <div className={`submission-card ${isError ? 'error' : ''}`}> {/* Add error class if it's an error */}
        <h2 className="submission-header">
          {isError ? 'Attendance Not Marked' : 'Attendance Marked Successfully'}
        </h2>
        <ul className="submission-list">
          <p>lol</p>
          <li><strong>ID:</strong> {id}</li>
          <li><strong>Email:</strong> {emailAddress}</li>
          <li><strong>Timestamp:</strong> {timestamp}</li>
          <li className={`response-message ${isError ? 'error-message' : ''}`}>
            <strong>Response Message:</strong> {responseMessage}
          </li>
        </ul>
        {isError && <p className="error-hint">It seems you have selected the wrong course for marking attendance.</p>}
        
        
      </div>
    </div>
  );
};

export default SubmissionDetails;
