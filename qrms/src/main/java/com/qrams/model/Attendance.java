package com.qrams.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Entity
@Getter
@Setter
public class Attendance {
    
    @EmbeddedId
    CourseStudentKey id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name="student_id")
    Student student;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name="course_id")
    Course course;

    public Attendance(Course course, Student student, Date date) {
        this.id = new CourseStudentKey(student.getId(), course.getId(), date);
        this.course = course;
        this.student = student;
    }

    public Attendance() {
    }

    public Date getDate() {
        return id.getDate();
    }

    public void setDate(Date date) {
        if (this.id == null) {
            this.id = new CourseStudentKey();
        }
        this.id.setDate(date);
    }

    @Override
    public String toString() {
        return "Attendance{" +
                "id=" + id +
                ", student=" + student +
                ", course=" + course +
                ", date=" + getDate() +
                '}';
    }
    
}
