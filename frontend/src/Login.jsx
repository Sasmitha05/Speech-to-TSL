import React, { useState, useEffect } from 'react';
import logo from './assets/silent-gestures-logo.png'; 
import image2 from './assets/background_img.webp'; 
import { useNavigate } from 'react-router-dom';
import fontPath from './assets/CinzelDecorative-Regular.ttf';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url(${fontPath}) format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/main');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred while logging in.');
    }
  };

  return (
    <div
      style={{
        width: '1100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${image2})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '360px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <img
          src={logo}
          alt="Silent Gestures Logo"
          style={{
            width: '100px',
            marginBottom: '20px',
          }}
        />
        <h2 style={{ marginBottom: '20px', color: '#0056b3', fontFamily: 'MyCustomFont, sans-serif' }}>Silent Gestures Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0056b3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#004085'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0056b3'}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          Don't have an account? <a href="/signup" style={{ color: '#0056b3', textDecoration: 'none' }}>Sign up here</a>
        </p>
        <div id="message" style={{ marginTop: '20px', color: '#d9534f' }}>
          {message}
        </div>
      </div>
    </div>
  );
}

export default Login;
