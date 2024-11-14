package com.qrams.repositories;

import com.qrams.model.Attendance;
import com.qrams.model.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AttendanceRepository extends CrudRepository<Attendance, Long> {
    List<Attendance> findByCourseId(Long courseId);
}
