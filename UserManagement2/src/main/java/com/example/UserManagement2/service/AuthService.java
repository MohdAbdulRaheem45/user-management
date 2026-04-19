package com.example.UserManagement2.service;

import com.example.UserManagement2.DTO.LoginRequest;
import com.example.UserManagement2.DTO.RegisterRequest;
import com.example.UserManagement2.entity.User;
import com.example.UserManagement2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    @Autowired
    private UserRepository repo;
    @Autowired
    private BCryptPasswordEncoder encoder;

    public String register(RegisterRequest req){
        if(repo.existsByEmail(req.getEmail())){
            throw new RuntimeException("Email Already Exists");
        }
        User user= User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .role("USER")
                .active(true)
                .phone(req.getPhone())
                .createdAt(LocalDateTime.now())
                .build();
        repo.save(user);
        return "Successfully Registered";
    }
    public String login(LoginRequest req) {
        User user = repo.findByEmail(req.getEmail()).orElseThrow(()->new RuntimeException("Email doesn't exist"));
        if(encoder.matches(req.getPassword(), user.getPassword())){
            return "Login Successful";
        }
        throw new RuntimeException("Invalid password");
    }
}
