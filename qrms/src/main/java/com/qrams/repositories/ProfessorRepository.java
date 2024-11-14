package com.qrams.repositories;

import com.qrams.model.Course;
import com.qrams.model.Professor;
import org.springframework.data.repository.CrudRepository;

public interface ProfessorRepository extends CrudRepository<Professor, Long> {
}
