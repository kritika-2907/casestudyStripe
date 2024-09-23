// src/pages/LoggedOutPage.js
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import UserContext
import '../App.css'; // Import your CSS file

function LoggedOutPage() {
  const { setUserEmail, setIsAuthenticated, setIsAdmin } = useContext(UserContext);

  useEffect(() => {
    // Clear context values
    setUserEmail(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    // Clear localStorage
    localStorage.removeItem('token');
  }, [setUserEmail, setIsAuthenticated, setIsAdmin]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically (optional)
    minHeight: '100vh', // Ensure container takes full height of the viewport
    textAlign: 'center', // Center text inside the container
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px', // Space between buttons
    marginTop: '20px', // Space above the button group
  };

  return (
    <div className="container" style={containerStyle}>
      <header>
        <div className="logo">TELSTAR</div>
      </header>

      <main>
        <h1>You Have Successfully Logged Out</h1>
        <p>Thank you for using our services. We hope to see you again soon!</p>
        <div style={buttonGroupStyle}>
          <Link to="/">
            <button>Back to Home</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default LoggedOutPage;