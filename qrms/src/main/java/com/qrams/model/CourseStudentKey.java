package com.qrams.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Embeddable
public class CourseStudentKey implements Serializable {
    @Column(name="student_id")
    long studentId;

    @Column(name="course_id")
    long courseId;

    @Column(name="date")
    Date date;

    public CourseStudentKey() {
    }

    public CourseStudentKey(long studentId, long courseId, Date date) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.date = date;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseStudentKey that = (CourseStudentKey) o;
        return studentId == that.studentId && 
               courseId == that.courseId && 
               Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, courseId, date);
    }
    
}
