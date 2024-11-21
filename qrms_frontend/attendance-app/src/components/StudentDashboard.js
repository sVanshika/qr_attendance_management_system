import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { Dropdown, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function StudentDashboard() {
    const location = useLocation();
    const { username, id, message } = location.state || {};
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.post('http://172.17.48.231:8080/api/student/getCourses', {
                studentId: id
            });
            console.log(response.data);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleViewAttendance = (courseId) => {
        // TODO: Implement view attendance functionality
        console.log('View attendance for course:', courseId);
    };

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <h2 style={{color: '#333', marginBottom: '1rem' }}>Welcome {username}!</h2>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Your Courses</h3>
                    <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                        {courses.map((course) => (
                            <Col key={course.id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title>{course.name}</Card.Title>
                                        <Card.Text>
                                            Course Code: {course.code}<br/>
                                            
                                        </Card.Text>
                                        <Dropdown>
                                            <Dropdown.Toggle 
                                                variant="primary" 
                                                id={`dropdown-${course.id}`}
                                                style={{ width: '100%' }}
                                            >
                                                Actions
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu style={{width: '100%'}}>
                                                <Dropdown.Item 
                                                  onClick={() => handleViewAttendance(course.id)}
                                                  style={{width: '100%'}}
                                                >
                                                    View Attendance
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default StudentDashboard;
