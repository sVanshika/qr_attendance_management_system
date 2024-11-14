package com.qrams.service;

import com.qrams.model.Course;
import com.qrams.model.Student;
import com.qrams.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student save(Student student){
        return studentRepository.save(student);
    }



    @Override
    public List<Student> saveAll(List<Student> studentList){
        return (List<Student>) studentRepository.saveAll(studentList);
    }

    @Override
    public void saveCourseForStudent(Student student, Course course) {
        Set<Course> courseSet = student.getCourses();
        courseSet.add(course);
        studentRepository.save(student);
    }

    @Override
    public List<Student> getStudentsByIdList(List<Long> idList) {
        return (List<Student>) studentRepository.findAllById(idList);
    }

    @Override
    public List<Student> getAllStudents(){
        return (List<Student>) studentRepository.findAll();
    }

    @Override
    public Student getStudentByEmail(String email) {
        // This will call the method from the repository
        return studentRepository.findByEmail(email);
    }



}
