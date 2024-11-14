// AttendanceRecord.js
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net'; // Make sure you have installed jQuery DataTables
import './AttendanceRecords.css';

const AttendanceRecord = () => {
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const convertUTCToIST = (utcDate) => {
      const date = new Date(utcDate);
      // IST is UTC +5:30
      const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
      const istDate = new Date(date.getTime() + istOffset);

      return date.toLocaleString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true // Set to false for 24-hour format, true for 12-hour format
      });
  };

  // Function to fetch attendance records
  const fetchAttendanceRecords = () => {
    const courseId = 101; // Example course ID, modify as needed

    $.ajax({
      url: `http://localhost:8080/api/course/getAttendance/101`,
      type: 'GET',
      success: function(data) {
        // Clear existing data in the table
        $('#attendanceTable tbody').empty();

        // Loop through the data and append it to the table
        data.forEach(record => {
        const formattedDate = convertUTCToIST(record.date);
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
    <div>
      <h2>Attendance Records</h2>
      <table id="attendanceTable" className="display">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Data will be appended here */}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecord;
