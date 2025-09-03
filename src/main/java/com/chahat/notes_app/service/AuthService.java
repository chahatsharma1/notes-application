package com.chahat.notes_app.service;

import com.chahat.notes_app.dto.AuthResponse;
import com.chahat.notes_app.dto.LoginRequest;
import com.chahat.notes_app.dto.RegisterRequest;

public interface AuthService {
    void register(RegisterRequest req);
    AuthResponse login(LoginRequest req);
}
