import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const DebugPage: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || 'No token found');
    
    if (storedToken) {
      try {
        // 简单的JWT解码（不验证签名）
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        setDecodedToken(payload);
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }, []);

  const testAPI = async () => {
    try {
      setError('');
      const response = await axios.get(`${API_BASE}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApiResponse(response.data);
      console.log('API Response:', response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      console.error('API Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Debug Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Stored Token:</h3>
        <textarea 
          value={token} 
          readOnly 
          style={{ width: '100%', height: '80px', fontFamily: 'monospace' }}
        />
      </div>

      {decodedToken && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Decoded Token:</h3>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '5px',
            whiteSpace: 'pre-wrap'
          }}>
            {JSON.stringify(decodedToken, null, 2)}
          </pre>
        </div>
      )}

      <button 
        onClick={testAPI}
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
        Test Profile API
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

      {apiResponse && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          border: '1px solid #c3e6cb',
          borderRadius: '5px'
        }}>
          <h3>API Response:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugPage; 