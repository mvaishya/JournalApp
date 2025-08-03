import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
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
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Welcome, {user?.name || 'User'}!
        </h1>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '16px' }}>
          You have successfully logged in with Google.
        </p>
        {user?.picture && (
          <img 
            src={user.picture} 
            alt="Profile" 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginBottom: '20px',
              border: '3px solid #4285f4'
            }}
          />
        )}
        <div style={{ marginBottom: '20px', color: '#555' }}>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            onClick={() => navigate('/journal')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3367d6'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4285f4'}
          >
            📊 Trading Journal
          </button>
          
          <button 
            onClick={onLogout}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;