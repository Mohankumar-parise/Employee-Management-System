package com.skills.employee.management.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EmployeeResponseDto {

    private Long id;
    private String name;
    private String email;
    private String department;
    private Double salary;
    private LocalDateTime createdAt;
}

