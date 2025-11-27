# Employee Management System (Spring Boot + React + MySQL + JWT)

A full-stack **Employee Management System** built with:

- **Backend:** Spring Boot, Spring Security, Spring Data JPA, MySQL  
- **Frontend:** React.js, Axios, React Router, Bootstrap  
- **Security:** JWT-based authentication & authorization  

This project demonstrates real-world skills like REST APIs, CRUD operations, authentication, and frontend–backend integration. Suitable to showcase to HRs, interviewers, and recruiters.

---

## 🧾 Table of Contents

1. [Features](#-features)  
2. [Technology Stack](#-technology-stack)  
3. [Prerequisites](#-prerequisites)  
4. [Project Setup & Run (Step by Step)](#-project-setup--run-step-by-step)  
   - [1. Clone the Repository](#1-clone-the-repository)  
   - [2. Backend Setup (Spring Boot)](#2-backend-setup-spring-boot)  
   - [3. Frontend Setup (React)](#3-frontend-setup-react)  
   - [4. Login & Use the Application](#4-login--use-the-application)  
5. [Application Screenshots (Step-by-Step Flow)](#-Application-Screenshots-(Step-by-Step-Flow))
6. [How the Application Works (High-Level Flow)](#-how-the-application-works-high-level-flow)  
7. [Project Structure](#-project-structure)  
8. [API Overview](#-api-overview)  
9. [Common Issues & Fixes](#-common-issues--fixes)  
10. [Future Enhancements](#-future-enhancements)  
11. [Author](#-author)

---

## ✅ Features

### 🔐 Authentication & Security
- User login with **email/username & password**
- Backend generates **JWT token** on successful login
- React stores JWT in `localStorage`
- All protected API calls include `Authorization: Bearer <token>`
- Spring Security validates token before giving access
- Role-based authorization possible (Admin/User)

### 👨‍💼 Employee Management
- Add new employee  
- Update existing employee  
- Delete employee  
- Fetch all employees  
- Fetch employee by ID  
- Validations at both frontend & backend  
- Prevent duplicate or invalid data (based on your validation logic)

### 🧱 Clean Architecture
- Layered structure: **Controller → Service → Repository → Database**
- DTOs for clean request/response objects
- Global exception handling for consistent API responses
- Ready to extend into microservices (separate auth/user services, etc.)

---

## 🧰 Technology Stack

### Backend
- Java 17 (or your version)
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL Driver
- Lombok

### Frontend
- React.js
- Axios
- React Router
- Bootstrap (for UI styling)

### Tools
- IntelliJ IDEA / STS (backend)
- VS Code (frontend)
- MySQL Workbench / CLI
- Postman (API testing)
- Git & GitHub

---

## 📦 Prerequisites

Before running the project, make sure you have:

- **Java** (JDK 17+ recommended)  
- **Maven** (if not using wrapper)  
- **Node.js & npm**  
- **MySQL Server** installed and running  
- **Git** (for cloning the repo)

---

## 🏃‍♂️ Project Setup & Run (Step by Step)

4. Login & Use the Application

Open browser and go to: http://localhost:3000

You’ll see the Login page (if authentication is enabled on frontend).

Enter credentials of an existing user (e.g., pre-seeded admin user)

Example:

admin@example.com / password

(Change as per your actual data)

On successful login:

Frontend stores JWT token in localStorage

You’re redirected to Employee Dashboard / Home

From there, you can:

View employee list

Add a new employee

Edit employee details

Delete employee

🧠 How the Application Works (High-Level Flow)

User opens app → hits React frontend (localhost:3000).

Login request (/auth/login) sent to Spring Boot backend (localhost:8080).

Backend verifies credentials and returns JWT token.

React stores the token in localStorage.

Every API call (e.g., /employees) uses Axios with header:

Authorization: Bearer <JWT_TOKEN>


Spring Security filter validates token:

If valid → request proceeds to controller → service → repository → database.

If invalid/expired → 401/403 error response.

MySQL stores all employee data.

Frontend shows data returned from backend and handles errors gracefully.

##📁 Project Structure

### Backend Structure

backend/src/main/java/com/skills.employee.management/
│
├── controller
│     └── (REST controllers – Auth, Employee, etc.)
│
├── service
│     └── (Interfaces for business logic)
│
├── service/impl
│     └── (Implementation classes)
│
├── repository
│     └── (Spring Data JPA repositories)
│
├── entity
│     └── (JPA entities for Employee, User, Role, etc.)
│
├── dto
│     └── (Request & Response DTOs)
│
├── exception
│     └── (Custom exceptions & global handler)
│
└── security
      └── (JWT utilities, filters, security config)

### Frontend Structure
frontend/src/
│
├── components
│     └── (Reusable components: forms, buttons, layout)
│
├── pages
│     └── (Main screens: Login, EmployeeList, AddEmployee, EditEmployee)
│
├── services
│     └── (API calls related to Employee/Auth)
│
├── api.js
│     └── (Axios instance + interceptors)
│
├── App.js
└── index.js


## 1. Clone the Repository
git clone https://github.com/Mohankumar-parise/Employee-Management-System.git
cd Employee-Management-System

### 2. Backend Setup (Spring Boot)
2.1. Create MySQL Database

Open MySQL (Workbench or CLI) and run:

CREATE DATABASE employee_db;


You can choose another name, but then also update the configuration.

2.2. Configure application.properties (or application.yml)

In backend
```txt
/src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# (Optional) For MySQL 8+
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

⚠️ Replace YOUR_DB_USERNAME and YOUR_DB_PASSWORD with your actual MySQL credentials.

2.3. Run Backend

From the backend folder:

cd backend

mvn spring-boot:run


or run the main class from your IDE (@SpringBootApplication class).

If successful, backend will run at:

🌐 http://localhost:8080

You should see something like Started Application in X seconds in the logs.

3. Frontend Setup (React)
3.1. Move to frontend folder
cd ../frontend

3.2. Install dependencies
npm install

3.3. Configure API base URL (if needed)

In your src/api.js or wherever you created the Axios instance, ensure the backend URL is correct:

// Example api.js
```txt
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Backend URL
});

// If using JWT interceptor:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```
3.4. Run React app
npm start


If successful, frontend will run at:

🌐 http://localhost:3000
## 🌐 API Overview
### Authentication APIs
| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Register a new user    |
| POST   | `/auth/login`    | Authenticate & get JWT |

#### Login Response Example:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin@example.com",
  "role": "ADMIN"
}
```

### Employee APIs
All secured endpoints require header:
```
Authorization: Bearer <JWT_TOKEN>
```
| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/employees`      | Get all employees   |
| GET    | `/employees/{id}` | Get employee by ID  |
| POST   | `/employees`      | Create new employee |
| PUT    | `/employees/{id}` | Update employee     |
| DELETE | `/employees/{id}` | Delete employee     |

---
Common Issues & Fixes
1. 403 Forbidden on API calls

Check if JWT token is sent in headers:

Open browser DevTools → Network tab → click request → Headers → Request Headers

You should see:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


Ensure React is reading correct localStorage key (e.g., token).

Make sure Spring Security config permits login APIs and secures others correctly.

2. Access denied / CORS error

Add CORS configuration in backend (if needed):

@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
        }
    };
}

3. Database connection error

Check DB name in application.properties

Confirm MySQL is running

Verify username/password

## Application Screenshots (Step-by-Step Flow)

### 1️⃣ Login with Username & Password  
Users enter their credentials to access the Employee Management Dashboard.

![Login](./screenshots/login.png)

---

### 2️⃣ Create a New Account (Registration Page)  
New users can register by providing username, email, password, and selecting a role.

![Register](./screenshots/register.png)

---

### 3️⃣ View All Employees (Dashboard Table)  
After login, users can see all employees with their ID, Name, Email, Department, and Salary.

![Employee List](./screenshots/employee-table-1.png)

---

### 4️⃣ Add a New Employee  
Users can enter employee details such as Name, Email, Department, and Salary.

![Add Employee](./screenshots/add-employee.png)

---

### 5️⃣ Updated Employee List After Adding New Employee  
The table reflects the newly added employee data.

![Employee Table After Add](./screenshots/employee-table-2.png)

---

### 6️⃣ Edit Employee Details  
You can update an employee's information directly from the edit form.

![Edit Employee](./screenshots/edit-employee.png)

---

### 7️⃣ Delete Employee (Confirmation Popup)  
Before deleting, the system asks for confirmation to avoid accidental deletions.

![Delete Confirmation](./screenshots/delete-confirm.png)

---

### 8️⃣ Employee Deleted Successfully  
The updated employee list is shown after the delete operation.

![Employee Table After Delete](./screenshots/employee-table-3.png)



🚀 Future Enhancements

Pagination & sorting for employee list

Role-based UI (Admin vs User)

Dockerize backend & frontend

Deploy to cloud (Render / Railway / AWS)

Microservice separation (Auth Service, Employee Service, etc.)

👨‍💻 Author

PARISE MOHANKUMAR

Java & Spring Boot Developer

React.js | MySQL | REST APIs

GitHub: https://github.com/Mohankumar-parise

LinkedIn: https://www.linkedin.com/in/mohankumar-parise/

If you find this project helpful, feel free to ⭐ star the repository.
