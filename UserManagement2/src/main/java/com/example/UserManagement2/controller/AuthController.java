package com.example.UserManagement2.controller;

import com.example.UserManagement2.DTO.LoginRequest;
import com.example.UserManagement2.DTO.RegisterRequest;
import com.example.UserManagement2.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid  @RequestBody RegisterRequest req){
        return new ResponseEntity<>(service.register(req), HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<String> register(@Valid @RequestBody LoginRequest req){
        return  ResponseEntity.ok(service.login(req));
    }

}
