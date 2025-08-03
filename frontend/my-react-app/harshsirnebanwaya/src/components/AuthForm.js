// src/components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { sha256 } from '../utils/crypto';

const AuthForm = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const passwordHash = await sha256(password);
            const endpoint = isLogin ? '/login' : '/register';
            const response = await axios.post(`http://localhost:8081/api/auth${endpoint}`, {
                email,
                passwordHash
            });

            if (response.data.userId) {
                onLoginSuccess({
                    id: response.data.userId,
                    email: email
                });
            } else {
                setError(response.data.error || 'An unknown error occurred.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: '4px' }}>
                    {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#4285f4', cursor: 'pointer', marginTop: '10px' }}>
                {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
        </div>
    );
};

export default AuthForm;
