import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { loadStripe } from "@stripe/stripe-js";
import { checkPlanStatus } from './CheckPlanStatus';
import './styles/PlanStatus.css'; // Create a CSS file for styling the box

const stripePromise = loadStripe('pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D');
const apiURL = 'http://localhost:9099';
const PlanStatus = () => {
  const { userEmail } = useContext(UserContext);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRenew, setIsRenew] = useState(false); // State for checkbox
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch the plan status when the component mounts
    const fetchPlanStatus = async () => {
      setLoading(true);
      try {
        const data = await checkPlanStatus(userEmail);
        console.log(data); // Log the entire response to check its structure
        setPlanData(data); // Store the entire response
      } catch (err) {
        setError('Failed to load plan status');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanStatus();
  }, [userEmail]);

  // const handlePayClick = () => {
  //   navigate('/payment-gateway', {
  //     state: {
  //       planId: planData?.plan.planId,
  //       planType: "POSTPAID",
  //       invoiceId: planData?.invoice?.invoiceId,
  //       changePlan: isRenew, // Set changePlan based on checkbox state
  //     },
  //   });
  // };

  const makePayment = async (planData, isRenew) => {
    
    // Load Stripe with your public API key
    const stripe = await loadStripe("pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D");

  
  console.log(planData.invoice.invoiceId)
    // API request to initiate the payment
    const response = await fetch(`${apiURL}/payPostpaidInvoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerMail: userEmail, // Pass the user's email
        planId: planData.plan.planId, // Plan ID from planData
        planType: "POSTPAID", // Plan type (default POSTPAID)
        invoiceId: planData.invoice.invoiceId,
        changePlan: isRenew,
      }),
    });
  
    // Handle the response
    if (response.ok) {
      const data = await response.json();
      const { sessionId } = data; // Ensure sessionId is correctly retrieved
  
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });
  
      // Log any errors during redirection
      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      const errorData = await response.json();
      console.error("Error creating checkout session:", errorData);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="plan-status-box">
      {planData ? (
        <>
          <h2>Current Plan Status</h2>
          {planData.plan ? ( // Check if planData.plan exists
            <>
              <p><strong>Plan Name:</strong> {planData.plan.planName}</p>
              <p><strong>Days Left:</strong> {planData.daysLeft} days</p> {/* Display daysLeft */}
            </>
          ) : (
            <p>No plan information available.</p> // Fallback if plan data is missing
          )}

          {planData.invoice && (
            <>
              <div className="invoice-info">
                <h3>Invoice Information</h3>
                <p><strong>Invoice ID:</strong> {planData.invoice.invoiceId}</p>
                <p><strong>Amount:</strong> Rs.{planData.invoice.amount}</p>
                <p><strong>Due Date:</strong> {new Date(planData.invoice.date).toLocaleDateString()}</p>
              </div>
              
              {/* Render Renew Plan checkbox and Pay button only if invoice data is available */}
              <div className="renew-plan">
              <div className="renew-plan">
  <label>
    <input
      type="checkbox"
      checked={isRenew}
      onChange={() => setIsRenew(!isRenew)}
    />
    <span className="change-text"> Change</span>
  </label>
</div>

              </div>

              <button onClick={() => makePayment(planData, isRenew)} className="pay-button">
                Pay
              </button>
            </>
          )}

          <p>{planData.message}</p>
        </>
      ) : (
        <p>No active plan found.</p>
      )}
    </div>
  );
};

export default PlanStatus;
