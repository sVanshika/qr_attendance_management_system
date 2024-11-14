package com.qrams.service;

import com.qrams.model.Course;
import com.qrams.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


@Service
public interface CourseService {
    public Course save(Course course);
    public List<Course> getAllCourses();
    public List<Course> saveAll(List<Course> courseList);
    public Set<Student> addStudentsInCourse(Course course, List<Student> studentList);
    public Course findById(Long courseId);
}
