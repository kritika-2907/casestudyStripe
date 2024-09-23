import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles/Landingpage.css'; // Import your CSS file
import About from './About';
import ImageSlider from './ImageSlider';

function LandingPage() {
  return (
    <div className="landing-container">
      <ImageSlider /> {/* Image slider at the top */}
      <br></br>
      <main>
        <h1 className="landing-title">Connecting Lives at Your Fingertips</h1> {/* Main title */}
        <p className="landing-subtitle">Get exclusive offers on the purchase of any plans</p> {/* Offer text */}

        <h2 className="section-title">Featured Plans</h2> {/* Section title */}

        <div className="plans-container">
          {/* Prepaid Plan */}
          <div className="plan">
            <h3 className="plan-title" >PREPAID</h3>
            <h4 className="plan-subtitle">Pay As You Go!</h4>
            <p className="plan-description">Ideal for: Students, light users, and anyone who prefers control over their expenses.</p>
            <div className="buttonplace">
              <Link to="/prepaid">
                <button className="plan-button">→</button>
              </Link>
            </div>
          </div>

          {/* Postpaid Plan */}
          <div className="plan">
            <h3 className="plan-title">POSTPAID</h3>
            <h4 className="plan-subtitle">Unlimited Convenience!</h4>
            <p className="plan-description">Ideal for: Professionals, families with uninterrupted services and bundled benefits.</p>
            <div className="buttonplace">
              <Link to="/postpaid">
                <button className="plan-button">→</button>
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <About />
      </main>
    </div>
  );
}

export default LandingPage;
