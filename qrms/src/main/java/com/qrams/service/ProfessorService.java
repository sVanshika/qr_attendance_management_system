package com.qrams.service;

import com.qrams.controllers.ProfessorController;
import com.qrams.model.Course;
import com.qrams.model.CourseDTO;
import com.qrams.model.Professor;
import com.qrams.model.Student;
import com.qrams.repositories.ProfessorRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.TreeSet;
import java.util.Comparator;

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
        logger.info("Save course for prof !" + professorId + " - courseId:");
        Professor professor = professorRepository.findById(professorId).orElse(null);
        professor.getCourses().addAll(courseList);
        professorRepository.save(professor);
        for (Course course : courseList) {
            course.setProfessor(professor);
            courseService.save(course);
        }
        
        return "success";
    }

    public Professor findById(Long professorId){
        return professorRepository.findById(professorId).orElse(null);
    }
    
    private CourseDTO mapCourseToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setCode(course.getCode());
        dto.setName(course.getName());
        if (course.getProfessor() != null) {
            dto.setProfessorId(course.getProfessor().getId());
        }
        return dto;
    }

    public Set<CourseDTO> getCoursesbyProfessorId(Long professorId){
        Professor professor = professorRepository.findById(professorId).orElse(null);
        if(professor != null){
            Set<Course> courses = professor.getCourses();
            // Create a TreeSet with custom comparator for CourseDTO
            Set<CourseDTO> courseDTOs = new TreeSet<>(new Comparator<CourseDTO>() {
                @Override
                public int compare(CourseDTO c1, CourseDTO c2) {
                    if (c1.getName() == null || c2.getName() == null) {
                        return 0;
                    }
                    return c1.getName().compareToIgnoreCase(c2.getName());
                }
            });
            
            // Add courses to the sorted set
            for (Course course : courses) {
                CourseDTO dto = mapCourseToDTO(course);
                courseDTOs.add(dto);
            }
            return courseDTOs;
        }
        return null;
    }

    public Professor authenticateProfessor(String email, String password) {
        logger.info("Authenticating professor with email: " + email);
        Professor professor = professorRepository.findByEmailAndPassword(email, password);
        if (professor == null) {
            logger.warn("Authentication failed for email: " + email);
            return null;
        }
        logger.info("Professor authenticated successfully: " + professor.getId());
        return professor;
    }
}
