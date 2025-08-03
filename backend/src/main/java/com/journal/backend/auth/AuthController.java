package com.journal.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;

    /**
     * Registers a new user
     * @param payload JSON containing email and passwordHash
     * @return Response with userId if successful, error message if not
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String passwordHash = payload.get("passwordHash");
        
        // Validate inputs
        if (email == null || passwordHash == null || email.trim().isEmpty()) {
            logger.warn("Registration attempt with missing data");
            return ResponseEntity.badRequest().body(Map.of("error", "Email and passwordHash required"));
        }
        
        // Simple email validation
        if (!email.contains("@") || !email.contains(".")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email format"));
        }
        
        // Password strength check (assuming it's already hashed)
        if (passwordHash.length() < 64) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid password hash"));
        }
        
        return authService.register(email, passwordHash)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Registration successful");
                    response.put("userId", user.getEmail());
                    logger.info("User registered successfully: {}", email);
                    return ResponseEntity.status(HttpStatus.CREATED).body(response);
                })
                .orElseGet(() -> {
                    logger.warn("Attempted to register with existing email: {}", email);
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(Map.of("error", "Email already registered"));
                });
    }

    /**
     * Authenticates a user
     * @param payload JSON containing email and passwordHash
     * @return Response with userId if successful, error message if not
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String passwordHash = payload.get("passwordHash");
        
        // Validate inputs
        if (email == null || passwordHash == null || email.trim().isEmpty()) {
            logger.warn("Login attempt with missing data");
            return ResponseEntity.badRequest().body(Map.of("error", "Email and passwordHash required"));
        }
        
        return authService.login(email, passwordHash)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Login successful");
                    response.put("userId", user.getEmail());
                    // In a real app, we'd generate and return a JWT token here
                    logger.info("User logged in successfully: {}", email);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    // Using a generic error message to prevent user enumeration
                    logger.warn("Failed login attempt: {}", email);
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("error", "Invalid credentials"));
                });
    }
    
    /**
     * Checks if an email is available for registration
     */
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email required"));
        }
        
        // Use the repository directly for this simple check
        boolean isAvailable = !authService.emailExists(email);
        return ResponseEntity.ok(Map.of("available", isAvailable));
    }
    
    /**
     * Handle Google OAuth logins
     */
    @PostMapping("/google-login")
    public ResponseEntity<?> handleGoogleLogin(@RequestBody Map<String, String> payload) {
        String googleId = payload.get("googleId");
        String email = payload.get("email");
        
        if (googleId == null || email == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Google ID and email are required"));
        }
        
        try {
            // This is just a simple integration - you would typically:
            // 1. Check if user exists with this Google ID
            // 2. If not, create a new user record
            // 3. Return user information

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Google login recorded");
            response.put("userId", email);
            logger.info("Google login recorded for: {}", email);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error handling Google login for {}: {}", email, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error processing Google login"));
        }
    }
}
