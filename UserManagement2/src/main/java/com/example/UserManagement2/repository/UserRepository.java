package com.example.UserManagement2.repository;

import com.example.UserManagement2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
     boolean existsByEmail(String email);
     Optional<User> findByEmail(String email);
}
