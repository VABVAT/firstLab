import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BugPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const jwtFromUrl = searchParams.get('jwt');
    const jwtFromStorage = localStorage.getItem('jwt');

    if (jwtFromUrl) {
      sendJwt(jwtFromUrl);
    } else if (jwtFromStorage) {
      sendJwt(jwtFromStorage);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const sendJwt = (jwt) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    fetch(`${baseUrl}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jwt }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Google auth failed');
        }
        return response.json();
      })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
          fetchInfo(data.jwt);
        }
      })
      .catch(() => {
        navigate('/');
      });
  };

  const fetchInfo = (jwt) => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    fetch(`${baseUrl}/api/auth/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jwt }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch info');
        }
        return response.json();
      })
      .then((data) => {
        setEmail(data.email);
        setSecretKey(data.secretKey);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h2>Bug Page</h2>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <>
            <p>Welcome! You are logged in.</p>
            {email && <p><strong>Email:</strong> {email}</p>}
            {secretKey && <p><strong>Secret Key:</strong> {secretKey}</p>}
            <button onClick={handleLogout} style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginTop: '20px'
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BugPage;
