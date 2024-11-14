import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';



function AdminDashboard() {
    const location = useLocation();
    const { username, id, message } = location.state || {};
  return (
    <div >
        <h2 style={{color: '#333', marginBottom: '1rem' }}>Welcome {username}!</h2>
    </div>
  );
}


export default AdminDashboard;
