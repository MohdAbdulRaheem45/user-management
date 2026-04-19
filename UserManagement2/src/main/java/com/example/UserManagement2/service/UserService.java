package com.example.UserManagement2.service;

import com.example.UserManagement2.DTO.UserResponse;
import com.example.UserManagement2.entity.User;
import com.example.UserManagement2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;
    public List<UserResponse> getAllUsers(){
        return repo.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    public UserResponse getUserById(int id){
        User user=repo.findById(id).orElseThrow(()->new RuntimeException("User Not Found"));
        return convertToResponse(user);
    }
    public UserResponse updateUser(int id,User newUser){
        User old = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        old.setUsername(newUser.getUsername());
        old.setPhone(newUser.getPhone());
        old.setRole(newUser.getRole());
        old.setActive(newUser.isActive());
        repo.save(old);
        return convertToResponse(old);
    }
    public void deleteUser(int id){
        User user=repo.findById(id).orElseThrow(()->new RuntimeException("User Not Found"));
        repo.delete(user);
    }
    private UserResponse convertToResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .phone(user.getPhone())
                .email(user.getEmail())
                .active(user.isActive())
                .role(user.getRole())
                .build();
    }
}
