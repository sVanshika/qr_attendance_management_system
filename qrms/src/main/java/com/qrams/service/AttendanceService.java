package com.qrams.service;

import com.qrams.model.Attendance;
import com.qrams.model.AttendanceResponseDTO;
import com.qrams.model.Course;
import com.qrams.model.Student;
import com.qrams.repositories.AttendanceRepository;
import com.qrams.repositories.CourseRepository;
import com.qrams.repositories.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private static final Logger logger = LoggerFactory.getLogger(AttendanceService.class);

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public void saveAttendance(Long courseId, List<Long> studentIds) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Student> students = (List<Student>) studentRepository.findAllById(studentIds);

        for (Student student : students) {
            LocalDateTime localDateTime = LocalDateTime.now();
            Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
            Attendance attendance = new Attendance(course, student, date);

            attendanceRepository.save(attendance);
        }
    }

    @Transactional
    public boolean saveAttendanceOnEmail(Long courseId, List<String> studentEmailAddressList) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        for(String email: studentEmailAddressList){
            Student student = studentRepository.findByEmail(email);
            System.out.println(student);
            if(course.getStudents().contains(student)){
                System.out.println("Student in course");

                LocalDateTime localDateTime = LocalDateTime.now();
                Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
                Attendance attendance = new Attendance(course, student, date);

                attendanceRepository.save(attendance);
                return true;

            } else {
                System.out.println("Student not in course");
                return false;
            }
        }

        return false;

    }



    public List<AttendanceResponseDTO> getAttendanceByCourseId(Long courseId) {
        List<Attendance> attendanceList = attendanceRepository.findByCourseId(courseId);
        for (Attendance attendance : attendanceList) {
            System.out.println(">>"+attendance.getDate());
        }

        Collections.sort(attendanceList, new Comparator<Attendance>() {
            @Override
            public int compare(Attendance a1, Attendance a2) {
                return a2.getDate().compareTo(a1.getDate()); // Descending order
            }
        });

        return attendanceList.stream()
            .map(attendance -> {
                logger.info("Mapping Attendance: " + attendance.getDate());
                return new AttendanceResponseDTO(
                    attendance.getDate(),
                    attendance.getStudent().getRollNumber(),
                    attendance.getStudent().getName(),
                    attendance.getStudent().getEmail()
                );
            })
            .collect(Collectors.toList());
    }
}
