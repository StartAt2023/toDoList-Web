import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../api/taskApi';

const TestPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || 'No token found');
  }, []);

  const testGetUserProfile = async () => {
    try {
      setError('');
      const user = await getUserProfile();
      setUserData(user);
      console.log('Test - User profile:', user);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      console.error('Test - Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>User Profile Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Stored Token:</h3>
        <textarea 
          value={token} 
          readOnly 
          style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
        />
      </div>

      <button 
        onClick={testGetUserProfile}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          marginBottom: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Get User Profile
      </button>

      {error && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb',
          borderRadius: '5px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {userData && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          border: '1px solid #c3e6cb',
          borderRadius: '5px'
        }}>
          <h3>User Data:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestPage; 