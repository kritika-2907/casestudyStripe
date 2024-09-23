import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import './styles/PostPaidPlan.css'; // Import the CSS file specific to Postpaid Plans
import postpaidImage from '../assets/images/postapid3.png'; // Assuming this is the correct path

const PostpaidPlans = () => {
  const [postpaidPlans, setPostpaidPlans] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostpaidPlans = async () => {
      try {
        const response = await axios.get('http://localhost:9099/postpaidPlans'); // Adjust URL if needed
        setPostpaidPlans(response.data.postpaidPlans);
      } catch (error) {
        setError('Error fetching postpaid plans');
      }
    };

    fetchPostpaidPlans();
  }, []);

  const handleBuyPlan = (planId) => {
    console.log(`I gave : ${planId}`)
    // Navigate to Payment page with the selected plan ID and planType
    navigate('/checkout', { state: { planId, planType: 'POSTPAID' } });
  };

  return (
    <div className="postpaid-container">
      <main>
        {/* Image Section */}
        <div className="postpaid-image-container">
          <img src={postpaidImage} alt="Postpaid Plans" className="postpaid-image" />
          <div className="postpaid-image-text">
            {/* Additional text or styling if needed */}
          </div>
        </div>
      </main>
      <br/>
      {/* Plans Section */}
      <div className="postpaid-main-content">
        <div className='postpaid-plan-content-center'>
          <h1>Postpaid Plans</h1>
          <p>Select a plan that suits you best.</p>

          <div className="postpaid-plans-container">
            {error && <p className="error-message">{error}</p>}
            {postpaidPlans.length > 0 ? (
              postpaidPlans.map((plan) => (
                <div className="postpaid-plan" key={plan.id}>
                  <h3 className="postpaid-plan-name">{plan.planName}</h3>
                  <p>{plan.planDescription}</p>
                  <p>Price: Rs. {plan.postpaidBalance}</p>
                  <p>Billing period: {plan.billingCycle} days</p>
                  <div className="postpaid-button-place">
                    <button
                      onClick={() => handleBuyPlan(plan.planId)}
                      className="postpaid-buy-button"
                    >
                      Buy Plan
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No postpaid plans available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostpaidPlans;
