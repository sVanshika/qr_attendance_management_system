package com.qrams.controllers;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.qrams.model.LoginRequestDto;

import com.qrams.model.Professor;
import com.qrams.service.ProfessorService;

import org.springframework.beans.factory.annotation.Autowired;
import com.qrams.model.Student;
import com.qrams.service.StudentService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequestDto loginRequest) {
        String role = loginRequest.getRole();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword(); // Validate the password securely

        // Log the login attempt details
        logger.info("Login attempt by user with email: {}", email);

        String username = "";
        String id = ""; // Replace with actual user ID

        // Log based on role
        switch (role.toLowerCase()) {
            case "admin":
                logger.info("Role: Admin user");
                username="Admin";
                id="A101";
                break;
            case "professor":
                logger.info("Role: Professor user");
                Professor professor = professorService.authenticateProfessor(email, password);
                if (professor != null) {
                    username = professor.getName();
                    id = professor.getId().toString();
                }
                else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("message", "Invalid email or password. Login failed!"));
                }    
                
                break;
            case "student":
                logger.info("Role: Student user");
                logger.info(email);
                logger.info(password);
               
                Student student = studentService.authenticateStudent(email, password);
                if (student != null) {
                    username = student.getName();
                    id = String.valueOf(student.getId());
                }
                else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("message", "Invalid email or password. Login failed!"));
                }    
                break;
            default:
                logger.warn("Unknown role: {}", role);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("message", "Unknown role. Login failed!"));
        }

        // Simulate success message (Replace with real authentication logic)
        return ResponseEntity.ok(Map.of("message", "User logged in successfully!", 
                                        "username", username,
                                        "id", id));
    }
}
