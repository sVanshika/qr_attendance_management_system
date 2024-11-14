package com.qrams.controllers;

import com.qrams.model.Professor;
import com.qrams.model.Student;
import com.qrams.service.ProfessorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/professor")
public class ProfessorController {
    private static final Logger logger = LoggerFactory.getLogger(ProfessorController.class);

    @Autowired
    ProfessorService professorService;

    @PostMapping("/create")
    public Professor createProfessor(@RequestBody Professor professor){
        logger.info("create student");
        return professorService.save(professor);
    }

    @GetMapping("/validateProfessorLogin")
    public boolean validateProfessorLogin(@RequestBody Professor professor){
        return true;
    }
}
