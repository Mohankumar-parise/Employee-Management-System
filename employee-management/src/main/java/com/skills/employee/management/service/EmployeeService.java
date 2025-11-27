package com.skills.employee.management.service;

import com.skills.employee.management.dtos.EmployeeRequestDto;
import com.skills.employee.management.dtos.EmployeeResponseDto;
import com.skills.employee.management.exceptions.DuplicateResourceException;
import com.skills.employee.management.exceptions.ResourceNotFoundException;
import com.skills.employee.management.entity.Employee;
import com.skills.employee.management.repositories.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeResponseDto createEmployee(EmployeeRequestDto dto) {

        if (employeeRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email already exists");
        }

        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());

        Employee saved = employeeRepository.save(employee);

        return new EmployeeResponseDto(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getDepartment(),
                saved.getSalary(),
                saved.getCreatedAt()
        );
    }

    public List<EmployeeResponseDto> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(e -> new EmployeeResponseDto(
                        e.getId(),
                        e.getName(),
                        e.getEmail(),
                        e.getDepartment(),
                        e.getSalary(),
                        e.getCreatedAt()
                )).toList();
    }

    public EmployeeResponseDto getEmployee(Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        return new EmployeeResponseDto(
                e.getId(), e.getName(), e.getEmail(),
                e.getDepartment(), e.getSalary(), e.getCreatedAt()
        );
    }

    public EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto dto) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        e.setName(dto.getName());
        e.setEmail(dto.getEmail());
        e.setDepartment(dto.getDepartment());
        e.setSalary(dto.getSalary());

        Employee updated = employeeRepository.save(e);

        return new EmployeeResponseDto(
                updated.getId(), updated.getName(), updated.getEmail(),
                updated.getDepartment(), updated.getSalary(), updated.getCreatedAt()
        );
    }

    public String deleteEmployee(Long id) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        employeeRepository.delete(e);
        return "Employee deleted";
    }
}
