package com.qrams.service;

import com.qrams.model.Course;
import com.qrams.model.Student;
import java.util.List;
import org.springframework.stereotype.Service;
import com.qrams.model.Attendance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public interface StudentService {
    public Student save(Student student);
    public List<Student> getAllStudents();
    public List<Student> saveAll(List<Student> studentList);

    public void saveCourseForStudent(Student student, Course course);
    public List<Student> getStudentsByIdList(List<Long> idList);

    public Student getStudentByEmail(String email);
    public Student findById(Long id);
    public List<Attendance> getAttendanceForStudentAndCourse(Long studentId, Long courseId);
    public Student authenticateStudent(String email, String password);
}
