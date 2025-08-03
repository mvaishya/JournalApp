import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Simple OAuth login using implicit flow (works best for client-side apps)
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setError(null);
            try {
                console.log('OAuth Success:', tokenResponse);
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                console.log('User Info:', userInfo.data);
                onLoginSuccess(userInfo.data);
                navigate('/home');
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Login successful, but failed to fetch user info. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
        onError: (errorResponse) => {
            console.log('Login Failed:', errorResponse);
            setError('Login failed. Please check your popup blocker settings and try again.');
            setIsLoading(false);
        },
        scope: 'openid profile email',
    });

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ 
                    marginBottom: '10px', 
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600'
                }}>Welcome</h1>
                
                <p style={{ 
                    marginBottom: '30px', 
                    color: '#666', 
                    fontSize: '16px',
                    lineHeight: '1.5'
                }}>
                    Please sign in with your Google account to continue
                </p>

                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        color: '#c33',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}
                
                <button 
                    onClick={() => login()}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '500',
                        backgroundColor: isLoading ? '#ccc' : '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        marginBottom: '20px',
                        transition: 'background-color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isLoading ? 'Signing in...' : 'Sign in with Google'}
                </button>
                
                <div style={{
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: '1.4'
                }}>
                    <p>Having trouble? Make sure:</p>
                    <ul style={{
                        textAlign: 'left',
                        marginTop: '8px',
                        paddingLeft: '16px'
                    }}>
                        <li>Popups are enabled for this site</li>
                        <li>You're accessing via http://localhost:3000</li>
                        <li>Your Google OAuth settings include this URL</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
