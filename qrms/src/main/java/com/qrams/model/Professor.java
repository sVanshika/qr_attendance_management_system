package com.qrams.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "professors")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    private String password;

   @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   private Set<Course> courses = new HashSet<>();
}

