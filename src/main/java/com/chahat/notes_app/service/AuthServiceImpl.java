package com.chahat.notes_app.service;

import com.chahat.notes_app.config.JWTProvider;
import com.chahat.notes_app.dto.AuthResponse;
import com.chahat.notes_app.dto.LoginRequest;
import com.chahat.notes_app.dto.RegisterRequest;
import com.chahat.notes_app.entity.User;
import com.chahat.notes_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public void register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPasswordHash(encoder.encode(req.getPassword()));

        userRepository.save(user);
    }


    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("User with this email does not exist"));

        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Password incorrect");
        }

        String token = JWTProvider.generateToken(user);
        return new AuthResponse(token);
    }
}