package com.qrams.repositories;

import com.qrams.model.Attendance;
import com.qrams.model.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.qrams.model.CourseStudentKey;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, CourseStudentKey> {
    @Query("SELECT DISTINCT a FROM Attendance a WHERE a.course.id = :courseId ORDER BY a.id.date DESC")
    List<Attendance> findByCourseId(@Param("courseId") Long courseId);

    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND a.course.id = :courseId ORDER BY a.id.date DESC")
    List<Attendance> getAttendanceForStudentAndCourse(@Param("studentId") Long studentId, @Param("courseId") Long courseId);
}
