package com.example.UserManagement2.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private int id;
    private String username;
    private String email;
    private String role;
    private boolean active;
    private String phone;
}
