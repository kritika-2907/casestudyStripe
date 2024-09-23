import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './styles/Register.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

  // Redirect to the logged-in page if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/loggedinloginpage'); // Adjust the route if needed
    }
  }, [isAuthenticated, navigate]);

  // Function to validate email format with regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to validate password complexity
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to validate phone number (exactly 10 digits)
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Function to validate full name (accepts first and last name types)
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    return nameRegex.test(name);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPhoneError('');
    setError('');

    // Check if any field is empty
    if (!name) {
      setNameError('Full name is required');
      return;
    }
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    if (!phone) {
      setPhoneError('Phone number is required');
      return;
    }

    // Perform validations
    if (!validateName(name)) {
      setNameError('Please enter a valid full name');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must have at least one uppercase letter, one special character, and one digit');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9099/register', {
        name,
        email,
        password,
        phone,
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);

      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (err) {
      setError('Error registering user');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="text"  // Changed type to "text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="inputGroup">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
            {phoneError && <p className="error-message">{phoneError}</p>}
          </div>
          <button type="submit" className="auth-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
