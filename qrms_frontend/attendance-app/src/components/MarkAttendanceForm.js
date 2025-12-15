import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function MarkAttendanceForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [stateData, setStateData] = useState(null);
    const [isTimeValid, setIsTimeValid] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        try {
            const hashData = window.location.hash.slice(1);
            if (!hashData) {
                setMessage({
                    text: 'Invalid QR code',
                    type: 'danger'
                });
                return;
            }

            const decodedData = JSON.parse(atob(hashData));
            setStateData(decodedData);

            const submittedAttendance = localStorage.getItem(`attendance_${decodedData.courseId}`);
            if (submittedAttendance) {
                const { email: submittedEmail, timestamp } = JSON.parse(submittedAttendance);
                if (new Date(timestamp) >= new Date(decodedData.activeFrom) && 
                    new Date(timestamp) <= new Date(decodedData.activeTill)) {
                        const emailWithDomain = submittedEmail.includes('@') ? submittedEmail : `${submittedEmail}@pilani.bits-pilani.ac.in`;
                    setEmail(emailWithDomain);
                    setHasSubmitted(true);
                    setMessage({
                        text: 'Attendance already marked successfully!',
                        type: 'success'
                    });
                    return;
                } else {
                    localStorage.removeItem(`attendance_${decodedData.courseId}`);
                }
            }

            const checkTimeValidity = () => {
                const now = new Date().getTime();
                const start = new Date(decodedData.activeFrom).getTime();
                const end = new Date(decodedData.activeTill).getTime();

                if (now < start) {
                    setIsTimeValid(false);
                    setMessage({
                        text: 'Attendance marking has not started yet',
                        type: 'warning'
                    });
                } else if (now > end) {
                    setIsTimeValid(false);
                    setMessage({
                        text: 'This QR code has expired',
                        type: 'warning'
                    });
                } else {
                    setIsTimeValid(true);
                    if (!hasSubmitted) {
                        setMessage({ text: '', type: '' });
                    }
                }
            };

            checkTimeValidity();
            const interval = setInterval(checkTimeValidity, 1000);
            return () => clearInterval(interval);

        } catch (error) {
            setMessage({
                text: 'Invalid QR code format',
                type: 'danger'
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stateData?.courseId || hasSubmitted) {
            return;
        }

        setLoading(true);

        try {
            const baseUrl = 'http://172.17.49.85:8080';
            const normalizedEmail = email.includes('@') ? email : `${email}@pilani.bits-pilani.ac.in`;
            const response = await axios.post(
                `${baseUrl}/api/course/markAttendance/${stateData.courseId}`,
                [normalizedEmail],
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if(response.data === "True"){
                localStorage.setItem(`attendance_${stateData.courseId}`, JSON.stringify({
                    email: normalizedEmail,
                    timestamp: new Date().toISOString()
                }));

                setMessage({
                    text: 'Attendance marked successfully!',
                    type: 'success'
                });
                setHasSubmitted(true);
            } else {
                setMessage({
                    text: 'Attendance not marked. Student is not present in the course!',
                    type: 'danger'
                });
            }

        } catch (error) {
            console.error('Error details:', error);
            setMessage({
                text: `Failed to mark attendance: ${error.message}`,
                type: 'danger'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Mark Attendance</h2>
                            
                            <div className={`alert alert-${message.type} mb-3`}>
                                {message.text || 'Please enter your email to mark attendance'}
                            </div>

                            <Form noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label>Student Email Prefix</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading || !stateData || !isTimeValid || hasSubmitted}
                                    />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button 
                                        variant="primary" 
                                        onClick={handleSubmit}
                                        size="lg"
                                        disabled={loading || !stateData || !isTimeValid || hasSubmitted}
                                    >
                                        {loading ? 'Submitting...' : 
                                         hasSubmitted ? 'Attendance Marked' : 'Submit'}
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarkAttendanceForm;