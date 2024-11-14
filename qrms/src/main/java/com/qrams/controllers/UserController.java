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

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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
                username="Yash";
                id="P101";
                break;
            case "student":
                logger.info("Role: Student user");
                username="Vanshika";
                id="S101";
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
