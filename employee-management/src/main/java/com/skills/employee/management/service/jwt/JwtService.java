package com.skills.employee.management.service.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET = "MY_SECRET_KEY_12345";
    private static final long EXPIRATION = 86400000;  // 1 Day

    // Generate Token
    public String generateToken(String username, String role) {
        return JWT.create()
                .withSubject(username)   // VERY IMPORTANT
                .withClaim("role", role)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION))
                .sign(Algorithm.HMAC256(SECRET));
    }

    // Extract Username
    public String extractUsername(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET))
                .build()
                .verify(token)
                .getSubject();  // MUST MATCH .withSubject()
    }

    // Extract Role
    public String extractRole(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET))
                .build()
                .verify(token)
                .getClaim("role")
                .asString();
    }
}
