import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseList.css'; // Import CSS file for styling

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  // Fetch the course data when the component loads
  useEffect(() => {
    axios.get('http://172.17.48.231:8080/api/course/getAll')
      .then((response) => {
        setCourses(response.data); // Update state with the fetched data
      })
      .catch((error) => {
        console.error('There was an error fetching the courses!', error);
      });
  }, []);

  return (
    <div className="course-list">
      <h1>Course List</h1>
      {courses.length > 0 ? (
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-item">
              <a href={`/course/${course.id}`} className="course-link">
                {course.name} ({course.code})
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading courses...</p>
      )}
    </div>
  );
};

export default CourseList;
