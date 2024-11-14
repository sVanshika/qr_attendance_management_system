package com.qrams.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
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

    private Date date;

//    public Attendance(CourseStudentKey id, Student student, Course course, Date date) {
//        this.id = id;
//        this.student = student;
//        this.course = course;
//        this.date = date;
//    }
    public Attendance(Course course, Student student) {
        this.id = new CourseStudentKey(course.getId(), student.getId());
        this.course = course;
        this.student = student;
    }

    public Attendance() {

    }

    public CourseStudentKey getId() {
        return id;
    }

    public void setId(CourseStudentKey id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Attendance{" +
                "id=" + id +
                ", student=" + student +
                ", course=" + course +
                ", date=" + date +
                '}';
    }
}
