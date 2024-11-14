package com.qrams.service;

import com.qrams.model.Course;
import com.qrams.model.Student;
import com.qrams.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getAllCourses() {
        List<Course> courseList = ((List<Course>) courseRepository.findAll());
        List<Course> newCourseList = new ArrayList<>();
        for(Course course: courseList){
            Course temp = new Course();
            temp.setId(course.getId());
            temp.setName(course.getName());
            temp.setCode(course.getCode());
            newCourseList.add(temp);
        }
        return newCourseList;
    }

    @Override
    public List<Course> saveAll(List<Course> courseList) {
        return ((List<Course>) courseRepository.saveAll(courseList));
    }

    @Transactional
    @Override
    public Set<Student> addStudentsInCourse(Course course, List<Student> studentList) {
        course.getStudents().addAll(studentList);
        courseRepository.save(course);
        return course.getStudents();
    }

    @Override
    public Course findById(Long courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }
}
