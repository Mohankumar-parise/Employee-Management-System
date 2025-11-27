package com.skills.employee.management.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmployeeRequestDto {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Department cannot be empty")
    private String department;

    @NotNull(message = "Salary cannot be empty")
    private Double salary;
}

