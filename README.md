# 👤 User Management System with Authentication

A full-stack user management application with secure authentication built using Spring Boot and React.js.

## 🛠️ Tech Stack
- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA, MySQL, BCrypt, Lombok
- **Frontend:** React.js, Axios, React Router DOM, Bootstrap
- **Tools:** Postman, Maven, IntelliJ IDEA

## ✨ Features
- User registration with input validation
- Secure login with BCrypt password encryption
- View all users with live search filter
- Update user details and role
- Delete user
- Role-based access (USER / ADMIN)
- Centralized exception handling with clean JSON error responses
- DTO pattern for clean API request/response separation

## 📁 Project Structure
```
backend/
├── controller/   → AuthController.java, UserController.java
├── service/      → AuthService.java, UserService.java
├── repository/   → UserRepository.java
├── entity/       → User.java
├── DTO/          → RegisterRequest, LoginRequest, UserResponse
├── config/       → SecurityConfig.java
└── exception/    → GlobalExceptionHandler.java

frontend/
├── src/
│   ├── api/         → axios.js
│   ├── components/  → Navbar, UserCard, AlertMessage
│   └── pages/       → Users, Register, Login, EditUser
```

## 🚀 How to Run

### Backend
```bash
# 1. Create MySQL database
CREATE DATABASE userdb;

# 2. Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/userdb
spring.datasource.username=root
spring.datasource.password=yourpassword

# 3. Run Spring Boot app
# Runs on http://localhost:8080
```

### Frontend
```bash
cd user-management-frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## 🔗 API Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/users | Get all users | Protected |
| GET | /api/users/{id} | Get user by ID | Protected |
| PUT | /api/users/{id} | Update user | Protected |
| DELETE | /api/users/{id} | Delete user | Protected |

## 🔐 Security
- Passwords encrypted using **BCryptPasswordEncoder**
- Spring Security configured to protect all `/api/users/**` routes
- Public routes: `/api/auth/**`
