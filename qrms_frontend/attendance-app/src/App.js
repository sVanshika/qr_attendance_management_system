import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import MarkAttendance from './components/MarkAttendance';
import MarkAttendanceForm from './components/MarkAttendanceForm';
import ViewAttendance from './components/ViewAttendance';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/professordashboard" element={<ProfessorDashboard />} />
          <Route path="/professor/markattendance" element={<MarkAttendance />} />
          <Route path="/student/markattendance" element={<MarkAttendanceForm />} />
          <Route path="/professordashboard/viewAttendance" element={<ViewAttendance />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



