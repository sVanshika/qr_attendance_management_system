package com.qrams.controllers;

import com.qrams.model.Attendance;
import com.qrams.model.AttendanceResponseDTO;
import com.qrams.model.Course;
import com.qrams.model.Professor;
import com.qrams.model.Student;
import com.qrams.service.AttendanceService;
import com.qrams.service.CourseService;
import com.qrams.service.ProfessorService;
import com.qrams.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/course")
public class CourseController {
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private CourseService courseService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private ProfessorService professorService;

    @PostMapping("/save")
    public Course save(@RequestBody Course course){
        logger.info("save course");
        logger.info(course.toString());
        return courseService.save(course);
    }

    @GetMapping("/getAll")
    public List<Course> getAllStudents(){
        logger.info("getAllStudents");
        return courseService.getAllCourses();
    }

    @PostMapping("/saveAll")
    public List<Course> saveAllCourses(@RequestBody List<Course> courseList){
        logger.info("saveAllCourses");
        return courseService.saveAll(courseList);
    }

    @PostMapping("/addStudents/{courseId}")
    public String addStudentsInCourse(@PathVariable("courseId") Long courseId,
                                             @RequestBody List<Long> studentIdList){
        logger.info("add students in course");
        Course course = courseService.findById(courseId);
        List<Student> studentList = studentService.getStudentsByIdList(studentIdList);
        Set<Student> studentSet = courseService.addStudentsInCourse(course, studentList);
        return "success";
    }

    @PostMapping("/mapProfessor")
    public String mapStudentToCourse(@RequestBody Map<String, Long> ids){
        Long courseId = ids.get("courseId");
        Long professorId = ids.get("professorId");
        Course course = courseService.findById(courseId);
        Set<Course> courseList = new HashSet<>();
        courseList.add(course);
        professorService.saveCourseForProfessor(professorId, courseList);
        return "success";

    }

    /*
    @PostMapping("/markAttendance/{courseId}")
    public ResponseEntity<String> markAttendance(@PathVariable("courseId") Long courseId,
                                 @RequestBody List<Long> studentIds){
        attendanceService.saveAttendance(courseId, studentIds);
        return new ResponseEntity<>("Attendance saved successfully", HttpStatus.OK);
    }
    */


    @PostMapping("/markAttendance/{courseId}")
    public ResponseEntity<String> markAttendance(@PathVariable("courseId") Long courseId,
                                                 @RequestBody List<String> studentEmailAddressList){
        boolean saved = attendanceService.saveAttendanceOnEmail(courseId, studentEmailAddressList);
        logger.info("Attendance saved: " + saved);
        if(saved){
            return new ResponseEntity<>("True", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("False", HttpStatus.OK);
        }

    }



    @GetMapping("/getAttendance/{courseId}")
    public List<AttendanceResponseDTO> getAttendanceByCourseId(@PathVariable Long courseId) {
        List<AttendanceResponseDTO> attendanceResponseDTOList = attendanceService.getAttendanceByCourseId(courseId);
        return attendanceResponseDTOList;
    }



}
