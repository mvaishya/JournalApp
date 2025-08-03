# Email-Password Authentication

This document outlines the implementation of traditional email-password authentication alongside the existing Google OAuth authentication in the Journal application.

## Features

- User registration with email and password
- User login with email and password
- Password security with client-side SHA-256 hashing
- Form validation for both login and registration
- Error handling and user feedback
- Seamless integration with existing Google OAuth

## Implementation Overview

### Frontend

The frontend implementation consists of enhanced React components that handle both Google OAuth and email-password authentication:

1. **LoginPage.js**
   - Provides a clean UI with both authentication options
   - Handles form input and validation
   - Communicates with backend authentication endpoints
   - Manages login/registration mode toggle

2. **Crypto Utility**
   - SHA-256 password hashing before transmission to backend
   - Ensures passwords are never sent in plain text

### Backend

The backend implementation consists of Spring Boot components that handle authentication requests:

1. **AuthController**
   - REST endpoints for `/api/auth/login` and `/api/auth/register`
   - Input validation and error handling
   - Response formatting

2. **AuthService**
   - Business logic for user registration
   - Business logic for user authentication
   - Email availability checking

3. **User Entity**
   - Database model for user data
   - Email and passwordHash fields

4. **Security Configuration**
   - CORS configuration for frontend access
   - Endpoint security settings

## Security Considerations

1. **Password Security**
   - Passwords are hashed with SHA-256 on the client before transmission
   - Prevents plain text passwords from being sent over the network
   - Consider adding server-side salting for production

2. **Input Validation**
   - Email format validation
   - Password strength requirements
   - Prevention of common attacks

3. **Error Handling**
   - Generic error messages to prevent user enumeration
   - Proper HTTP status codes
   - Comprehensive logging

## Testing

You can test the authentication using these credentials:

- Email: test@example.com
- Password: password123

## Future Enhancements

1. **JWT Authentication**
   - Implement token-based authentication for API security
   - Session management

2. **Password Reset Functionality**
   - Implement forgot password flow
   - Email verification

3. **Enhanced Security**
   - Implement rate limiting
   - Account lockout after failed attempts
   - Two-factor authentication
