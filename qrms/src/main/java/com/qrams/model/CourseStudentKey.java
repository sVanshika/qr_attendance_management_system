package com.qrams.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class CourseStudentKey implements Serializable {
    @Column(name="student_id")
    long studentId;

    @Column(name="course_id")
    long courseId;

    public CourseStudentKey() {
    }

    public CourseStudentKey(long studentId, long courseId) {
        this.studentId = studentId;
        this.courseId = courseId;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }
}
