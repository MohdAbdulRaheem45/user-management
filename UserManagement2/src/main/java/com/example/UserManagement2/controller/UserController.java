package com.example.UserManagement2.controller;

import com.example.UserManagement2.DTO.UserResponse;
import com.example.UserManagement2.entity.User;
import com.example.UserManagement2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService service;
    @GetMapping
    public ResponseEntity<List<UserResponse>> getallUsers(){
        return ResponseEntity.ok(service.getAllUsers());
    }
    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable int id){
        return service.getUserById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id,@RequestBody User user){
        return new ResponseEntity<>(service.updateUser(id,user), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id){
     service.deleteUser(id);
     return ResponseEntity.noContent().build();
    }

}
