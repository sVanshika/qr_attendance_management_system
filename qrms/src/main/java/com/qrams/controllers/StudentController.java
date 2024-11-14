package com.qrams.controllers;

import com.qrams.model.Student;
import com.qrams.service.StudentServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
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
}
