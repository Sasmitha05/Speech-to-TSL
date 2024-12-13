import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo from './assets/silent-gestures-logo.png';
import image2 from './assets/background_img.webp';
import fontPath from './assets/CinzelDecorative-Regular.ttf';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupUsernameError, setSignupUsernameError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url('${fontPath}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupUsernameError('');
    setSignupPasswordError('');
    setConfirmPasswordError('');

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match.");
      return;
    }
    if (username.trim() === '') {
      setSignupUsernameError('Username is required.');
      return;
    }
    if (password.trim() === '') {
      setSignupPasswordError('Password is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/login');  
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.signupContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.heading}>Silent Gestures</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            {signupUsernameError && (
              <span style={styles.errorMessage}>{signupUsernameError}</span>
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {signupPasswordError && (
              <span style={styles.errorMessage}>{signupPasswordError}</span>
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
            {confirmPasswordError && (
              <span style={styles.errorMessage}>{confirmPasswordError}</span>
            )}
          </div>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.signInText}>
          Already have an account?{' '}
          <a href="/login" style={styles.signInLink}>
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundImage: `url(${image2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '1100px',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
  },
  signupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '360px',
  },
  logo: {
    width: '80px',
    marginBottom: '20px',
  },
  heading: {
    color: '#0056b3',
    marginBottom: '20px',
    fontFamily: 'MyCustomFont, sans-serif',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#003c7a',
  },
  signInText: {
    marginTop: '20px',
    fontSize: '14px',
  },
  signInLink: {
    color: '#0056b3',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Signup;