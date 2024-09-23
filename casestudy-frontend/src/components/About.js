import React from 'react';
import './styles/About.css'; // Import the CSS file
import person1Img from '../assets/images/person1.jpg';
import person2Img from '../assets/images/person2.jpeg';
import person3Img from '../assets/images/person3.avif';
import person4Img from '../assets/images/person4.jpg';
import person5Img from '../assets/images/person5.jpg';
import person6Img from '../assets/images/person6.png';

const About = () => {
    return (
        <div>
            <div className="about-container">
                <h1>About Us</h1>
                <p style={{textAlign: 'justify', lineHeight: '1.8', fontSize: '18px', color: '#343434'}}>
    At TELSTAR, we are committed to connecting people and businesses with reliable, innovative, and affordable communication solutions. With a passion for delivering world-class services, we provide cutting-edge technology to power your everyday communications, whether it’s through high-speed internet, seamless mobile networks, or tailored business solutions.
    Founded with the goal of making connectivity accessible to everyone, we have grown into a trusted name in the telecom industry, serving millions of customers with integrity, transparency, and exceptional customer service. Our state-of-the-art infrastructure and dedication to constant innovation ensure that you stay connected anytime, anywhere.
</p>
            </div>
            
            <div className="customer-reviews">
                <h2>What Our Customers Say</h2>
                <div className="reviews-grid">
                    <div className="review">
                        <img src={person1Img} alt="Harshit Rana" className="review-image" />
                        <p>“Best telecom service I’ve ever used!” - Vivek Pandith</p>
                    </div>
                    <div className="review">
                        <img src={person2Img} alt="Radhika Menon" className="review-image" />
                        <p>“Reliable and fast Internet, highly recommend!” - Ayush Raj</p>
                    </div>
                    <div className="review">
                        <img src={person3Img} alt="Aarav Sharma" className="review-image" />
                        <p>“Great customer support and excellent service quality.” - Shivanshu Dev</p>
                    </div>
                    <div className="review">
                        <img src={person4Img} alt="Priya Patel" className="review-image" />
                        <p>“Affordable plans and seamless connectivity. Very satisfied!” - Sneha</p>
                    </div>
                    <div className="review">
                        <img src={person5Img} alt="Vijay Kumar" className="review-image" />
                        <p>“The best choice for all my communication needs.” - Priya</p>
                    </div>
                    <div className="review">
                        <img src={person6Img} alt="Neha Gupta" className="review-image" />
                        <p>“Impressed with the fast internet speed and reliability.” - Neha Gupta</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;