package com.qrams.service;

import com.qrams.controllers.ProfessorController;
import com.qrams.model.Course;
import com.qrams.model.Professor;
import com.qrams.model.Student;
import com.qrams.repositories.ProfessorRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {
    private static final Logger logger = LoggerFactory.getLogger(ProfessorController.class);


    @Autowired
    ProfessorRepository professorRepository;

    @Autowired
    CourseService courseService;

    public Professor save(Professor professor){
        return professorRepository.save(professor);
    }

    public String saveCourseForProfessor(Long professorId, Set<Course> courseList){
        logger.info("Save course for prof !" + professorId + " - courseId:" + courseList.get(0));
        Professor professor = professorRepository.findById(professorId).orElse(null);
        professor.getCourses().addAll(courseList);
        professorRepository.save(professor);
        return "success";
    }

    public Professor findById(Long professorId){
        return professorRepository.findById(professorId).orElse(null);
    }
}
