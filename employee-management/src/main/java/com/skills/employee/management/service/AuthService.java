package com.skills.employee.management.service;

import com.skills.employee.management.dtos.LoginRequestDto;
import com.skills.employee.management.dtos.LoginResponseDto;
import com.skills.employee.management.dtos.RegisterRequestDto;

public interface AuthService {
    String register(RegisterRequestDto request);
    LoginResponseDto login(LoginRequestDto request);
}

