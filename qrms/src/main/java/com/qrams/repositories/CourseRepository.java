package com.qrams.repositories;

import com.qrams.model.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
}
