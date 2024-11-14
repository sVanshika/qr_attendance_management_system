package com.qrams.model;
import java.util.Date;

public class AttendanceResponseDTO {
    private Date date;
    private String studentId; // or any other field you want to include
    private String studentName; // example field
    // Add other fields from Student as needed
    private String studentEmail;

    // Constructors


    public AttendanceResponseDTO() {
    }

    public AttendanceResponseDTO(Date date, String studentId, String studentName, String studentEmail) {
        this.date = date;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
    }

    // Getters and Setters
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }
}

