import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './styles/adminaddition.css';

function AddPlans() {
  const [plan, setPlan] = useState({
    planName: '',
    planType: 'PREPAID', // Default value for the dropdown
    description: '',
    ratePerUnit: '',
    prepaidBalance: '',
    billingCycle: '',
  });
  const [planExists, setPlanExists] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Check if the plan already exists
  useEffect(() => {
    const checkPlanExistence = async () => {
      if (plan.planName) {
        try {
          const response = await fetch(`http://localhost:9099/admin/checkPlanName/${plan.planName}`);
          const data = await response.json();
          setPlanExists(data.exists);
        } catch (err) {
          console.error('Error checking plan existence:', err);
        }
      }
    };

    checkPlanExistence();
  }, [plan.planName]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPrepaid = plan.planType === 'PREPAID';
    const isPostpaid = plan.planType === 'POSTPAID';

    if (isPrepaid && !plan.prepaidBalance) {
      alert('Please enter a prepaid balance for prepaid plans.');
      return;
    }

    if (isPostpaid && !plan.billingCycle) {
      alert('Please enter a billing cycle for postpaid plans.');
      return;
    }

    if (planExists) {
      alert('A plan with this name already exists.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9099/admin/addPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan.planName,
          ratePerUnit: parseFloat(plan.ratePerUnit),
          description: plan.description,
          planType: plan.planType,
          prepaidBalance: isPrepaid ? parseFloat(plan.prepaidBalance) : undefined,
          billingCycle: isPostpaid ? plan.billingCycle : undefined,
        }),
      });

      if (response.ok) {
        console.log('Plan added successfully');
        navigate('/admindashboard');
      } else {
        const errorData = await response.json();
        console.error(errorData.error || 'Failed to add plan');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="container">
      <main>
        <h1>Add Plans</h1>
        <form onSubmit={handleSubmit} className="form-container-vertical">
          <input
            type="text"
            name="planName"
            placeholder="Plan Name"
            value={plan.planName}
            onChange={handleChange}
            required
          />
          <select
            name="planType"
            value={plan.planType}
            onChange={handleChange}
            required
          >
            <option value="PREPAID">Prepaid</option>
            <option value="POSTPAID">Postpaid</option>
          </select>
          <textarea
            name="description"
            placeholder="Plan Description"
            value={plan.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="ratePerUnit"
            placeholder="Rate Per Unit"
            value={plan.ratePerUnit}
            onChange={handleChange}
            required
          />
          {plan.planType === 'PREPAID' && (
            <input
              type="number"
              name="prepaidBalance"
              placeholder="Prepaid Balance"
              value={plan.prepaidBalance}
              onChange={handleChange}
            />
          )}
          {plan.planType === 'POSTPAID' && (
            <input
              type="text"
              name="billingCycle"
              placeholder="Billing Cycle"
              value={plan.billingCycle}
              onChange={handleChange}
            />
          )}
          <button type="submit" className="admin-button">Add Plan</button>
        </form>
        {planExists && <p style={{ color: 'red' }}>A plan with this name already exists.</p>}
      </main>
    </div>
  );
}

export default AddPlans;
