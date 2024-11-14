package com.qrams.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String rollNumber;

    @Column(unique = true)
    private String email;

    private String password;

//    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
//    @JoinTable(
//            name="student_course",
//            joinColumns = @JoinColumn(name="student"),
//            inverseJoinColumns = @JoinColumn(name="course")
//    )
//    private Set<Course> courses = new HashSet<>();

    @ManyToMany(mappedBy = "students")
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy="student")
    private Set<Attendance> attendanceSet;

    public Student(){}

    public Student(long id) {
        this.id = id;
    }

    public Student(long id, String name, String rollNumber, String email) {
        this.id = id;
        this.name = name;
        this.rollNumber = rollNumber;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Set<Attendance> getAttendanceSet() {
        return attendanceSet;
    }

    public void setAttendanceSet(Set<Attendance> attendanceSet) {
        this.attendanceSet = attendanceSet;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", rollNumber='" + rollNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
