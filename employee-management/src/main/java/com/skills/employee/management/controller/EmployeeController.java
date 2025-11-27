package com.skills.employee.management.controller;

import com.skills.employee.management.dtos.EmployeeRequestDto;
import com.skills.employee.management.dtos.EmployeeResponseDto;
import com.skills.employee.management.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeResponseDto> createEmployee(
            @Valid @RequestBody EmployeeRequestDto dto) {
        return ResponseEntity.ok(employeeService.createEmployee(dto));
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDto>> getAll() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDto dto) {

        return ResponseEntity.ok(employeeService.updateEmployee(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.deleteEmployee(id));
    }
}
