package com.qrams.repositories;

import com.qrams.model.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
    Student findByEmail(String email);
}
