import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import UserContext
import './styles/auth.css';  // Import the CSS file
 
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  // Access context setters for userEmail, isAuthenticated, and isAdmin
  const { setUserEmail, setIsAdmin, setIsAuthenticated } = useContext(UserContext);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post('http://localhost:9099/login', {
        email,
        password,
      });
 
      // Handle successful login
      console.log('Login successful:', response.data);
 
      // Store token, email, and isAdmin status in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', email); // Store user email in localStorage
      localStorage.setItem('isAdmin', response.data.isAdmin); // Store admin status in localStorage
 
      // Update context with the user's email, authentication status, and admin status
      setUserEmail(email);
      setIsAuthenticated(true);
      setIsAdmin(response.data.isAdmin);
 
      // Redirect based on admin status
      navigate(response.data.isAdmin ? '/admindashboard' : '/loggedinloginpage', { replace: true });
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };
 
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    </div>
  );
}
 
export default LoginPage;