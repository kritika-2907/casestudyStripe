import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/CheckoutPage.css'; // Import the CSS file
import { checkPlanStatus } from './CheckPlanStatus'; // Import the checkPlanStatus function

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [planDetails, setPlanDetails] = useState(null);
  const [planType, setPlanType] = useState(''); // To store the planType
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      const { planId, planType } = location.state || {};
      if (planId && planType) {
        try {
          // Fetch the plan details using the planId
          const response = await axios.post('http://localhost:9099/viewPlan', { planId });
          if (response.status === 201 && response.data.plan) {
            setPlanDetails(response.data.plan);
            setPlanType(planType); // Set planType state
          } else {
            setError('Error fetching plan details.');
          }
        } catch (error) {
          setError('Error fetching plan details.');
        }
      } else {
        setError('No plan ID provided.');
      }
    };

    fetchPlanDetails();
  }, [location.state]);

  const validateContactDetails = async () => {
    try {
      const response = await axios.post('http://localhost:9099/validateCustomer', { email });
      const { customerPhone } = response.data;

      if (customerPhone !== phone) {
        setError('Invalid phone number.');
      } else {
        setCustomerDetails({customerPhone});
        setError('');
      }
    } catch (error) {
      setError('Invalid email or server error.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await validateContactDetails();
  };

  const handleSubscribe = async () => {
    const { planId, planType } = location.state || {};
    const response = await checkPlanStatus(email);
    console.log(response);
    navigate('/paymentsuccess', { state: { planId, planType } });
    
  };

  return (
    <div className="checkout-container">
      {planDetails && (
        <div className="plan-details-box">
          <h2>Plan Details</h2>
          <p><strong>Plan Name:</strong> {planDetails.planName}</p>
          <p><strong>Description:</strong> {planDetails.planDescription}</p>
          <p><strong>Billing Cycle:</strong> {planDetails.billingCycle} days</p>
          <p><strong>Plan Type:</strong> {planType}</p> {/* Displaying the plan type */}
        </div>
      )}
      <div className="contact-form">
        <h2>Contact Details</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Phone:
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className='validate-button'>Validate</button>
        </form>
        <br/>
        {customerDetails && (
          <button onClick={handleSubscribe} className="subscribe-button">Subscribe</button>
        )}
      </div>
    </div>
  );
};

export default Checkout;