import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Use QRCodeCanvas from qrcode.react
import AttendanceButton from './AttendanceButton'; // Import the AttendanceButton component
import $ from 'jquery';
import 'datatables.net'; // Make sure you have installed jQuery DataTables
import './QRCodeGenerator.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const QRCodeGenerator = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrValue, setQRValue] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Function to generate QR Code
  const generateQRCode = () => {
    const uniqueCode = Math.random().toString(36).substring(7); // Generate random string
    const loginURL = `${window.location.origin}/login?code=${uniqueCode}`; // URL for login page with query parameter
    setQRValue(loginURL);
    setShowQRCode(true);
  };

  const convertUTCToIST = (utcDate) => {
      const date = new Date(utcDate);
      // IST is UTC +5:30
      const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
      const istDate = new Date(date.getTime() + istOffset);
      return istDate.toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    };

  // Function to fetch attendance records
  const fetchAttendanceRecords = () => {
    const courseId = 101; // Example course ID, you can modify this as needed

    $.ajax({
      url: `http://172.17.48.231:8080/api/course/getAttendance/${courseId}`,
      type: 'GET',
      success: function(data) {
        // Clear existing data in the table
        $('#attendanceTable tbody').empty();

        // Loop through the data and append it to the table
        data.forEach(record => {
        const formattedDate = convertUTCToIST(record.date);
        console.log(record.date)
          $('#attendanceTable tbody').append(`
            <tr>
              <td>${formattedDate}</td>
              <td>${record.studentId}</td>
              <td>${record.studentName}</td>
              <td>${record.studentEmail}</td>
            </tr>
          `);
        });

        // Initialize DataTable
        $('#attendanceTable').DataTable();
      },
      error: function(xhr, status, error) {
        console.error('Error fetching attendance records:', error);
      }
    });
  };

  return (
    <div className="qr-code-generator">
      <h2>Course: OOAD</h2>
      {!showQRCode ? (
        <div className="button-row">
          <AttendanceButton onClick={generateQRCode} /> {/* Render the Mark Attendance button */}
          <button className="attendance-button" onClick={generateQRCode}>
            Mark Attendance
          </button>
          <button className="get-attendance-btn btn btn-primary" onClick={() => navigate('/attendance-records')}>
            Get Attendance Records
          </button>
        </div>
      ) : (
        <div className="qr-code-container">
          <h1>Scan this QR Code</h1>
          <QRCodeCanvas value={qrValue} size={256} /> {/* Use QRCodeCanvas component */}
          <p>Scan this code.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
