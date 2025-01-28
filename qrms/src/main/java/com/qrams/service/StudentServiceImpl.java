package com.qrams.service;

import com.qrams.model.Course;
import com.qrams.model.Student;
import com.qrams.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import com.qrams.model.Attendance;
import com.qrams.repositories.AttendanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class StudentServiceImpl implements StudentService{
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);


    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

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

    @Override
    public Student findById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Attendance> getAttendanceForStudentAndCourse(Long studentId, Long courseId) {
        logger.info("Student Service Impl:Getting attendance for student ID: {} in course ID: {}", studentId, courseId);
        List<Attendance> attendanceList = attendanceRepository.getAttendanceForStudentAndCourse(studentId, courseId);
        logger.info("Attendance list size: {}", attendanceList.size());
        return attendanceList;
    }

    @Override
    public Student authenticateStudent(String email, String password) {
        return studentRepository.findByEmailAndPassword(email, password);
    }


}
