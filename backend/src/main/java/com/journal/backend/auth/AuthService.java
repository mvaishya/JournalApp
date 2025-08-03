package com.journal.backend.auth;

import com.journal.backend.entity.User;
import com.journal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Autowired
    private UserRepository userRepository;

    /**
     * Registers a new user with email and password hash
     * @param email User's email
     * @param passwordHash Pre-hashed password from frontend (SHA-256)
     * @return Optional with User if registration successful, empty if email already exists
     */
    public Optional<User> register(String email, String passwordHash) {
        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            logger.warn("Registration attempt with existing email: {}", email);
            return Optional.empty(); // Already registered
        }
        
        // In a production environment, we should salt and hash the already-hashed password
        // But for simplicity in this example, we'll store it as received
        User user = userRepository.save(new User(email, passwordHash));
        logger.info("New user registered: {}", email);
        
        return Optional.of(user);
    }

    /**
     * Authenticates a user with email and password hash
     * @param email User's email
     * @param passwordHash Pre-hashed password from frontend (SHA-256)
     * @return Optional with User if authentication successful, empty if not
     */
    public Optional<User> login(String email, String passwordHash) {
        Optional<User> userOpt = userRepository.findByEmailAndPasswordHash(email, passwordHash);
        
        if (userOpt.isPresent()) {
            logger.info("Successful login: {}", email);
        } else {
            logger.warn("Failed login attempt for: {}", email);
        }
        
        return userOpt;
    }
    
    /**
     * Checks if an email already exists in the system
     * @param email The email to check
     * @return true if email exists, false otherwise
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
