import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

function ProfessorDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, id, message } = location.state || {};
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [courses, setCourses] = React.useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [activeFrom, setActiveFrom] = useState('');
    const [activeTill, setActiveTill] = useState('');

    React.useEffect(() => {
        fetch(`${BASE_URL}/api/professor/getCourses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                professorId: id
            })
        })
        .then(response => response.json())
        .then(data => {
            setCourses(data);
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
    }, [id]);

    const handleMarkAttendance = (courseId) => {
        setSelectedCourseId(courseId);
        setShowModal(true);
    };

    const handleGenerateQR = () => {
        navigate(`/professor/markattendance`, {
            state: { 
                courseId: selectedCourseId, 
                professorId: id,
                activeFrom: activeFrom,
                activeTill: activeTill
            }
        });
        setShowModal(false);
    };

    const handleViewAttendance = (courseId) => {
        navigate(`/professordashboard/viewAttendance`, {
            state: { 
                courseId: courseId,
                courseName: courses.find(course => course.id === courseId)?.name
            }
        });
    };

    return (
        <div>
            <h2 style={{color: '#333', marginBottom: '1rem' }}>Welcome Professor {username}!</h2>
            {/* list of all courses */}
            <div className="container">
                <div className="row">
                    {courses.map((course) => (
                        <div key={course.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">Course Code: {course.code}</p>
                                    <div className="dropdown">
                                        <button 
                                            className="btn btn-primary dropdown-toggle" 
                                            type="button" 
                                            id={`dropdown-${course.id}`}
                                            data-bs-toggle="dropdown" 
                                            aria-expanded="false"
                                            style={{width: '100%'}}
                                        >
                                            Actions
                                        </button>
                                        
                                        <ul className="dropdown-menu" aria-labelledby={`dropdown-${course.id}`} style={{width: '100%'}}>
                                            <li>
                                                <button 
                                                    className="dropdown-item" 
                                                    onClick={() => handleMarkAttendance(course.id)}
                                                    style={{width: '100%'}}
                                                >
                                                    Mark Attendance
                                                </button>
                                            </li>
                                            <li>
                                                <button 
                                                    className="dropdown-item"
                                                    onClick={() => handleViewAttendance(course.id)}
                                                    style={{width: '100%'}}
                                                >
                                                    View Attendance
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>QR Code Active Time</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Active From</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={activeFrom}
                                onChange={(e) => setActiveFrom(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Active Till</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={activeTill}
                                onChange={(e) => setActiveTill(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleGenerateQR}
                        disabled={!activeFrom || !activeTill}
                    >
                        Generate QR
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfessorDashboard;
