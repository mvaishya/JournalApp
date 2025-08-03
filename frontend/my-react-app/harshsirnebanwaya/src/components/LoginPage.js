import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sha256 } from '../utils/crypto';
import api from '../utils/apiConfig';
import { saveUserToStorage } from '../utils/auth';

const LoginPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Keep using axios directly for Google API calls
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                console.log('User Info:', userInfo.data);
                
                // If needed, we could notify our backend about the Google login
                try {
                    await api.post('/api/auth/google-login', {
                        googleId: userInfo.data.sub,
                        email: userInfo.data.email
                    }).catch(err => {
                        // Just log but don't block the login flow if this fails
                        console.log('Could not record Google login in backend:', err);
                    });
                } catch (backendError) {
                    // Don't block the main flow for backend errors
                    console.warn('Backend integration error:', backendError);
                }
                
                // Save user to localStorage and update state
                saveUserToStorage(userInfo.data);
                onLoginSuccess(userInfo.data);
                navigate('/journal');
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: (errorResponse) => console.log('Login Failed:', errorResponse),
    });
    
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const passwordHash = await sha256(password);
            const endpoint = isLogin ? '/login' : '/register';
            const response = await api.post(`/api/auth${endpoint}`, {
                email,
                passwordHash
            });

            if (response.data.userId) {
                const userData = {
                    sub: response.data.userId, // Use the same format as Google OAuth
                    email: email,
                    name: email.split('@')[0], // Use part of email as name
                    authMethod: 'email' // To track login method
                };

                // Save user to localStorage and update state
                saveUserToStorage(userData);
                onLoginSuccess(userData);
                navigate('/journal');
            } else {
                setError(response.data.error || 'An unknown error occurred.');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                backgroundColor: '#f8f9fa',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ marginBottom: '20px', color: '#333' }}>Welcome</h1>
                
                {/* Google Login Button */}
                <button 
                    onClick={() => login()}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#3367d6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4285f4'}
                >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ marginRight: '10px' }}>
                        <g>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                        </g>
                    </svg>
                    Sign in with Google
                </button>
                
                <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
                    <p style={{ margin: '0 10px', color: '#666' }}>OR</p>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
                </div>
                
                {/* Email/Password Form */}
                <form onSubmit={handleEmailSubmit} style={{ textAlign: 'left' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
                        {isLogin ? 'Login with Email' : 'Create an Account'}
                    </h3>
                    
                    {error && (
                        <div style={{ 
                            color: 'red', 
                            backgroundColor: '#ffecec', 
                            padding: '10px', 
                            borderRadius: '4px', 
                            marginBottom: '15px',
                            fontSize: '14px'
                        }}>
                            {error}
                        </div>
                    )}
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            width: '100%',
                            opacity: loading ? 0.7 : 1,
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                    
                    <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ color: '#4285F4', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;