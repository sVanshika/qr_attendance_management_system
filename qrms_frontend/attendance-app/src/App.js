// //// App.js
// //import React from 'react';
// //import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// //import './App.css';
// //import QRCodeGenerator from './components/QRCodeGenerator';
// //import LoginPage from './components/LoginPage';
// //import SubmissionDetails from './components/SubmissionDetails';
// //import AttendanceRecords from './components/AttendanceRecords'; // Import AttendanceRecords component
// //import Header from './components/Header';  // Import Header component
// //import Footer from './components/Footer';  // Import Footer component
// //import 'datatables.net-dt/css/dataTables.dataTables.css'; // Use the correct CSS file
// //
// //function App() {
// //  return (
// //    <Router>
// //      <div className="App">
// //        <Header /> {/* Render the Header */}
// //
// //        <div className="main-content">
// //          <Routes>
// //            {/* Route for login page */}
// //            <Route path="/login" element={<LoginPage />} />
// //            {/* Route for submission details page */}
// //            <Route path="/submission-details" element={<SubmissionDetails />} />
// //            {/* Route for attendance records */}
// //            <Route path="/getAttendance/:courseId" element={<AttendanceRecords />} /> {/* Added route for attendance records */}
// //            <Route path="/" element={<QRCodeGenerator />} />
// //          </Routes>
// //        </div>
// //
// //        <Footer /> {/* Render the Footer */}
// //      </div>
// //    </Router>
// //  );
// //}
// //
// //export default App;

// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import QRCodeGenerator from './components/QRCodeGenerator';
// import LoginPage from './components/LoginPage';
// import SubmissionDetails from './components/SubmissionDetails';
// import AttendanceRecords from './components/AttendanceRecords'; // Import AttendanceRecord component
// import Header from './components/Header';  // Import Header component
// import Footer from './components/Footer';  // Import Footer component
// import 'datatables.net-dt/css/dataTables.dataTables.css'; // Use the correct CSS file

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header /> {/* Render the Header */}

//         <div className="main-content">
//           <Routes>
//             {/* Route for login page */}
//             <Route path="/login" element={<LoginPage />} />
//             {/* Route for submission details page */}
//             <Route path="/submission-details" element={<SubmissionDetails />} />
//             {/* Route for attendance records page */}
//             <Route path="/attendance-records" element={<AttendanceRecords/>} /> {/* New route */}
//             <Route path="/" element={<QRCodeGenerator />} />
//           </Routes>
//         </div>

//         <Footer /> {/* Render the Footer */}
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;



