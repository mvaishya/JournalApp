import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Journal from './components/Journal';
import { getUserFromStorage, clearUserFromStorage } from './utils/auth';

// Protected Route component
const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppContent() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing user session on app startup
  useEffect(() => {
    const savedUser = getUserFromStorage();
    if (savedUser) {
      console.log('Restored user from localStorage:', savedUser);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    setUser(null);
    clearUserFromStorage();
    navigate('/');
  };

  // Show loading spinner while checking for saved session
  if (isLoading) {
    return (
      <div className="App" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/journal" replace /> : <LoginPage onLoginSuccess={setUser} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute user={user}>
              <Journal user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
