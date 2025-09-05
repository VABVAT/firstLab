import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      window.location.href = `${baseUrl}/api/auth/google`;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h2>Welcome!</h2>
      <button onClick={handleLogin} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Log in with Google
      </button>
    </div>
  );
};

export default LoginPage;
