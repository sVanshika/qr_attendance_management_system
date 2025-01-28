import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import MarkAttendance from './components/MarkAttendance';
import MarkAttendanceForm from './components/MarkAttendanceForm';
import ViewAttendance from './components/ViewAttendance';
import ViewAttendanceStudent from './components/ViewAttendanceStudent';

// Add Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userRole = sessionStorage.getItem('userRole');

  if (!isLoggedIn || (allowedRole && userRole !== allowedRole)) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/studentdashboard" element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admindashboard" element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/professordashboard" element={
            <ProtectedRoute allowedRole="professor">
              <ProfessorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/professor/markattendance" element={
            <ProtectedRoute allowedRole="professor">
              <MarkAttendance />
            </ProtectedRoute>
          } />
          <Route path="/student/markattendance" element={<MarkAttendanceForm />} />
          <Route path="/student/viewAttendance" element={<ViewAttendanceStudent />} />
          <Route path="/professordashboard/viewAttendance" element={<ViewAttendance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



