import React, { useState, useEffect, useRef } from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import './ViewAttendance.css';  
import * as XLSX from 'xlsx';  


function ViewAttendance() {
    const location = useLocation();
    const { courseId, courseName } = location.state || {};
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef(null);
    const dataTableRef = useRef(null);
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const convertUTCToIST = (utcDateStr) => {
        try {
            // Check if utcDateStr is undefined or null
            if (!utcDateStr) {
                console.error('Invalid date string received:', utcDateStr);
                return 'Invalid Date';
            }

            // Create Date object directly from ISO string
            const date = new Date(utcDateStr);
            
            // IST is UTC +5:30
            const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
            const istDate = new Date(date.getTime());
            
            return istDate.toLocaleString('en-IN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
        } catch (error) {
            console.error('Error converting date:', error, 'Input:', utcDateStr);
            return 'Invalid Date';
        }
    };

    useEffect(() => {
        if (courseId) {
            fetchAttendanceData();
        }
    }, [courseId]);

    useEffect(() => {
        // Initialize DataTable
        if (attendanceData.length > 0 && !dataTableRef.current) {
            // Add custom date range filtering
            $.fn.dataTable.ext.search.push(
                function(settings, data, dataIndex) {
                    const minDate = $('#minDate').val();
                    const maxDate = $('#maxDate').val();
                    const dateStr = data[0]; // Date is in first column

                    if (minDate === '' && maxDate === '') return true;
                    
                    // Parse the IST formatted date string back to Date object
                    const [datePart] = dateStr.split(',');
                    const [day, month, year] = datePart.split('/');
                    const dateOnly = new Date(year, month - 1, day);
                    
                    const min = minDate ? new Date(minDate) : null;
                    const max = maxDate ? new Date(maxDate + 'T23:59:59') : null; // Add time to include full day

                    // Set hours to 0 for consistent date comparison
                    dateOnly.setHours(0, 0, 0, 0);
                    if (min) min.setHours(0, 0, 0, 0);

                    if (min && max) {
                        return dateOnly >= min && dateOnly <= max;
                    } else if (min) {
                        return dateOnly >= min;
                    } else if (max) {
                        return dateOnly <= max;
                    }
                    return true;
                }
            );

            dataTableRef.current = $(tableRef.current).DataTable({
                responsive: true,
                data: attendanceData,
                columns: [
                    { 
                        data: 'date',
                        title: 'Date & Time',
                        render: function(data, type, row) {
                            // Add debugging
                            console.log('Date data received:', data);
                            return data ? convertUTCToIST(data) : 'N/A';
                        }
                    },
                    { 
                        data: 'studentId',
                        title: 'Roll Number'
                    },
                    { 
                        data: 'studentName',
                        title: 'Name'
                    },
                    { 
                        data: 'studentEmail',
                        title: 'Email'
                    }
                ],
                order: [[0, 'desc']], // Sort by date descending by default
                pageLength: 10,
                dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
                     '<"row"<"col-sm-12"tr>>' +
                     '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
                language: {
                    search: "Search:",
                    lengthMenu: "Show _MENU_ entries",
                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    paginate: {
                        first: "First",
                        last: "Last",
                        next: "Next",
                        previous: "Previous"
                    }
                }
            });

            // Add event listeners for date filters
            $('#minDate, #maxDate').on('change', function() {
                dataTableRef.current.draw();
            });
        }

        // Update cleanup
        return () => {
            if (dataTableRef.current) {
                // Remove the custom filter before destroying
                $.fn.dataTable.ext.search.pop();
                dataTableRef.current.destroy();
                dataTableRef.current = null;
            }
        };
    }, [attendanceData]);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/course/getAttendance/${courseId}`);
            console.log('API Response:', response.data);
            setAttendanceData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch attendance data');
            console.error('Error fetching attendance:', err);
        } finally {
            setLoading(false);
        }
    };

    const downloadExcel = () => {
        try {
            // Get the current filtered data from DataTable
            const filteredData = dataTableRef.current.rows({ search: 'applied' }).data().toArray();
            
            // Transform data for Excel
            const excelData = filteredData.map(record => ({
                'Date & Time': record.date ? convertUTCToIST(record.date) : 'N/A',
                'Roll Number': record.studentId,
                'Name': record.studentName,
                'Email': record.studentEmail
            }));

            // Create worksheet
            const ws = XLSX.utils.json_to_sheet(excelData);
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Attendance');

            // Generate filename with course name and date
            const fileName = `${courseName}_Attendance_${new Date().toISOString().split('T')[0]}.xlsx`;

            // Save file
            XLSX.writeFile(wb, fileName);
        } catch (error) {
            console.error('Error downloading Excel:', error);
            setError('Failed to download Excel file');
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">Attendance Record - {courseName}</h3>
                    {attendanceData.length > 0 && (
                        <Button 
                            variant="success" 
                            onClick={downloadExcel}
                            className="ms-2"
                        >
                            Download Excel
                        </Button>
                    )}
                </Card.Header>
                <Card.Body>
                    {attendanceData.length === 0 ? (
                        <div className="text-center text-muted">
                            No attendance records found for this course
                        </div>
                    ) : (
                        <>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                        <label className="me-2">From:</label>
                                        <input
                                            type="date"
                                            id="minDate"
                                            className="form-control form-control-sm"
                                        />
                                        <label className="mx-2">To:</label>
                                        <input
                                            type="date"
                                            id="maxDate"
                                            className="form-control form-control-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <table 
                                ref={tableRef} 
                                className="table table-striped table-bordered dt-responsive nowrap" 
                                style={{width: '100%'}}
                            >
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Roll Number</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                            </table>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default ViewAttendance;