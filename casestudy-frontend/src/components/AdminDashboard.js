import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/adminpage.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext
import img6 from '../assets/images/img6.png'; // Import the image
import axios from 'axios'; // Import axios for API requests

function AdminDashboard() {
  const { isAdmin, isAuthenticated } = useContext(UserContext); // Access admin status and authentication status
  const navigate = useNavigate(); // Initialize useNavigate

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/error'); // Redirect to an error page if the user is not an admin
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleChangeDueDate = async () => {
    try {
      const response = await axios.post('http://localhost:9099/setDueDateTwoDaysFromNow', { customerMail: email });
      setMessage(response.data.message);
      setError('');
      setEmail(''); // Clear the input field
    } catch (error) {
      setError('Error updating due date. Please check the email and try again.');
      setMessage('');
      console.error('Error updating due date:', error);
    }
  };

  return (
    <div className="container">
      <main>
        <h1>Welcome Admin 😁</h1>
        {/* Image above the Admin Dashboard heading */}
        <img src={img6} alt="Admin banner" className="admin-banner" />
        {isAdmin ? (
          <>
            <div className="admin-actions">
              <button className="admin-button">
                <Link to="/addplans">Add Plans</Link>
              </button>
              <button className="admin-button">
                <Link to="/addcustomer">Add Customer</Link>
              </button>
              <button className="admin-button" onClick={() => document.getElementById('dueDateForm').style.display = 'block'}>
                Change Due Date
              </button>

            </div>
            <div id="dueDateForm" className="due-date-form" style={{ display: 'none', marginTop:'10px' }}>
            <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter customer email"
  required
/>
<button onClick={handleChangeDueDate} className="admin-button" style={{ marginTop: '10px' }}>
  Change Due Date
</button>
<br/>
              <button onClick={() => {
                document.getElementById('dueDateForm').style.display = 'none';
                document.getElementById('dueDateForm').style.marginTop = '10px';
              }} className="admin-button">
                Cancel
              </button>
              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          </>
        ) : (
          <p>Access Denied. You do not have the required permissions.</p>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
