import React, { useEffect, useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import './styles/PrepaidPlan.css'; // Import the CSS file specific to Prepaid Plans
import prepaidImage from '../assets/images/prepaid.png'; // Adjust path if necessary

const stripePromise = loadStripe('pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D');

const PrepaidPlans = () => {
  const { userEmail } = useContext(UserContext);
  const [prepaidPlans, setPrepaidPlans] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiURL = 'http://localhost:9099';

  useEffect(() => {
    const fetchPrepaidPlans = async () => {
      try {
        const response = await axios.get('http://localhost:9099/prepaidPlans'); // Adjust URL if needed
        setPrepaidPlans(response.data.prepaidPlans);
      } catch (error) {
        setError('Error fetching prepaid plans');
      }
    };

    fetchPrepaidPlans();
  }, []);

  // const handleBuyPlan = (planId) => {
  //   console.log(planId)
  //   // Navigate to Payment page with the selected plan ID and planType
  //   navigate('/payment-gateway', { state: { planId, planType: 'PREPAID' } });
  // };
  const makePayment = async (plan) => {
    console.log(plan);
    console.log(userEmail);
    const stripe = await loadStripe("pk_test_51PzMJ92LE9UHjUCiRYxbweuMYXgYud6jst1hGkeWirgTU3mBVfPqqkTmEX4uXSPqUV10ab9uviGTBAsjOgsJJUPg00ydnLub8D");
  
    const response = await fetch(`${apiURL}/buyPlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerMail: userEmail, // directly use userEmail from context
        planId: plan.planId,
        planType: "PREPAID",
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const { sessionId } = data; // Ensure sessionId is correctly retrieved
  
      const result = await stripe.redirectToCheckout({ sessionId });
  
      if (result.error) {
        console.error(result.error.message); // Log any errors
      }
    } else {
      const errorData = await response.json();
      console.error("Error creating checkout session:", errorData);
    }
  };

  return (
    <div className="prepaid-container">
      <main>
        {/* Image Section */}
        <div className="prepaid-image-container">
          <img src={prepaidImage} alt="Prepaid Plans" className="prepaid-image" />
          <div className="prepaid-image-text">
            {/* Additional text or styling if needed */}
          </div>
        </div>
      </main>
<br/>
      <div className="prepaid-main-content" >
        <div className='prepaid-plan-content-center'>
        <h1>Prepaid Plans</h1>
          <p>Select a plan that suits you best</p>

        <div className="prepaid-plans-container">
        
          {error && <p className="error-message">{error}</p>}
          {prepaidPlans.length > 0 ? (
            prepaidPlans.map((plan) => (
              <div className="prepaid-plan" key={plan.id}>
                <h3 className="prepaid-plan-name">{plan.planName}</h3>
                <p>{plan.planDescription}</p>
                <p>Price: Rs. {plan.prepaidBalance}</p>
                <p>Billing period: {plan.billingCycle} days</p>
                <div className="prepaid-button-place">
                 
                  <button
                    onClick={() => makePayment(plan)}
                    className="prepaid-buy-button"
                  >
                    Buy Plan
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No prepaid plans available.</p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default PrepaidPlans;
