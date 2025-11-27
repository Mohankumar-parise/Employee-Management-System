package com.skills.employee.management.service.impl;

import com.skills.employee.management.dtos.LoginRequestDto;
import com.skills.employee.management.dtos.LoginResponseDto;
import com.skills.employee.management.dtos.RegisterRequestDto;
import com.skills.employee.management.entity.User;
import com.skills.employee.management.repositories.UserRepository;
import com.skills.employee.management.service.AuthService;
import com.skills.employee.management.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public String register(RegisterRequestDto req) {

        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(req.getRole());

        userRepository.save(user);

        return "User registered successfully";
    }

    @Override
    public LoginResponseDto login(LoginRequestDto req) {

        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole());

        return new LoginResponseDto(token, user.getUsername(), user.getRole());
    }
}
