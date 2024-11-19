package com.qrams.model;

public class CourseDTO {
    private long id;
    private String code;
    private String name;
    private Long professorId;

    public CourseDTO() {
    }

    public CourseDTO(Course course) {
        this.id = course.getId();
        this.code = course.getCode();
        this.name = course.getName();
        if (course.getProfessor() != null) {
            this.professorId = course.getProfessor().getId();
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Long professorId) {
        this.professorId = professorId;
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", professorId=" + professorId +
                '}';
    }
}
