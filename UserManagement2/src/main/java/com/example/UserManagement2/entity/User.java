package com.example.UserManagement2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String role;
    private String phone;
    private LocalDateTime createdAt;
    private boolean active;
}
