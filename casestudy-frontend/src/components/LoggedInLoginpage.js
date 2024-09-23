// src/pages/LoggedInLandingPage.js
import React from 'react';
import { Link} from 'react-router-dom';
import './styles/LoggedInLoginpage.css'
import PlanStatus from './PlanStatus';

function LoggedInLandingPage() {
  return (
    <div className="landing-container">
      <main>
        <br/>  
        <h1>Welcome Back!</h1>
        <p>Continue exploring our exclusive offers and plans.</p> 
        <PlanStatus/>
        <br />
        <h2>Featured Plans</h2>
        <br/>
        <div className="plans-container">
          <div className="plan">
            <h3>PREPAID</h3>
            <h4>Pay As You Go!</h4>
            <p>Ideal for: Students, light users, and anyone who prefers control over their expenses.</p>
            <div className='buttonplace'>
              {/* Navigating to prepaid plans */}
              <Link to="/prepaid">
                <button className='prepaid-button'>→</button>
              </Link>
            </div>
          </div>
          <div className="plan">
            <h3>POSTPAID</h3>
            <h4>Unlimited Convenience!</h4>
            <p>Ideal for: Professionals, families, and heavy users who want uninterrupted services.</p>
            <div className="buttonplace">
              {/* Navigating to postpaid plans */}
              <Link to="/postpaid">
                <button className='postpaid-button'>→</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoggedInLandingPage;
