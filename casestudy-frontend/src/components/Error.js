import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div style={styles.errorContainer}>
      <h1 style={styles.errorTitle}>Access Denied</h1>
      <p style={styles.errorMessage}>You do not have the necessary permissions to view this page.</p>
      <Link to="/" style={styles.backHome}>Go Back to Home</Link>
    </div>
  );
}

const styles = {
  errorContainer: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  errorTitle: {
    fontSize: '36px',
    color: '#d9534f', // Red color for error heading
  },
  errorMessage: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  backHome: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#083D77', // Your brand color
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default ErrorPage;
