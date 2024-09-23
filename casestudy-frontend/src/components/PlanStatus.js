import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { loadStripe } from "@stripe/stripe-js";
import { checkPlanStatus } from './CheckPlanStatus';
import './styles/PlanStatus.css';

const stripePromise = loadStripe('pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D');
const apiURL = 'http://localhost:9099';

const PlanStatus = () => {
  const { userEmail } = useContext(UserContext);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRenew, setIsRenew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanStatus = async () => {
      setLoading(true);
      try {
        const data = await checkPlanStatus(userEmail);
        console.log("Fetched plan data:", data); // Log the fetched data
        setPlanData(data); // Update state with fetched data
      } catch (err) {
        console.error("Error fetching plan status:", err);
        setError('Failed to load plan status');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanStatus();
  }, [userEmail]);

  const makePayment = async (planData, isRenew) => {
    try {
      // Load Stripe with your public API key
      const stripe = await loadStripe("pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D");
  
      console.log(`Invoice ID: ${planData.invoice.invoiceId}`);
  
      // API request to initiate the payment
      const response = await fetch(`${apiURL}/payPostpaidInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerMail: userEmail, // Pass the user's email
          invoiceId: planData.invoice.invoiceId,
          changePlan: isRenew,
        }),
      });
  
      // Check if response is okay
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating checkout session:", errorData);
        return;
      }
  
      const data = await response.json();
      const { sessionId } = data;
  
      // Check if sessionId is present
      if (!sessionId) {
        console.error("Payment process failed: sessionId is missing");
        return;
      }
  
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });
  
      // Handle errors during the redirect
      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment process failed:", error);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="plan-status-box">
      {planData ? (
        <>
          <h2>Current Plan Status</h2>
          {planData.plan ? (
            <>
              <p><strong>Plan Name:</strong> {planData.plan.planName}</p>
              <p><strong>Days Left:</strong> {planData.daysLeft} days</p>
            </>
          ) : (
            <p>No plan information available.</p>
          )}

          {planData.invoice && (
            <>
              <div className="invoice-info">
                <h3>Invoice Information</h3>
                <p><strong>Invoice ID:</strong> {planData.invoice.invoiceId}</p>
                <p><strong>Amount:</strong> Rs.{planData.invoice.amount}</p>
                <p><strong>Due Date:</strong> {new Date(planData.invoice.date).toLocaleDateString()}</p>
              </div>

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
