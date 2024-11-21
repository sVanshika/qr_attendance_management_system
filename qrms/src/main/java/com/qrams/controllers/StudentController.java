package com.qrams.controllers;

import com.qrams.model.Student;
import com.qrams.service.StudentServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.qrams.model.CourseDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/student")
public class StudentController {
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);


    @Autowired
    private StudentServiceImpl studentService;

    @PostMapping("/create")
    public Student createStudent(@RequestBody Student student){
        logger.info("create student");
        return studentService.save(student);
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents(){
        logger.info("getAllStudents");
        return studentService.getAllStudents();
    }

    @PostMapping("/saveAll")
    public List<Student> saveAllStudents(@RequestBody List<Student> studentList){
        logger.info("saveAllStudents");
        return studentService.saveAll(studentList);
    }
    @PostMapping("/getCourses")
    public ResponseEntity<List<CourseDTO>> getStudentCourses(@RequestBody Map<String, String> request) {
        Long studentId = Long.parseLong(request.get("studentId"));
        try {
            
            logger.info("Getting courses for student ID: {}", studentId);
            Student student = studentService.findById(studentId);
            
            if (student == null) {
                return ResponseEntity.notFound().build();
            }

            List<CourseDTO> courseDTOs = student.getCourses().stream()
                .map(course -> new CourseDTO(course))
                .collect(Collectors.toList());

            return ResponseEntity.ok(courseDTOs);
        } catch (Exception e) {
            logger.error("Error getting courses for student ID {}: {}", studentId, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
