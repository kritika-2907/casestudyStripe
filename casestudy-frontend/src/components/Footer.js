import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import specific icons
import './styles/Footer.css'; // Import your existing CSS

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Telstar. All Rights Reserved.</p>
                <div className="social-icons">
                    {/* Social Media Links with React Icons */}
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon" >
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
                        <FaTwitter />
                    </a>
                    <a href="mailto:info@yourcompany.com" className="icon">
                        <FaEnvelope />
                    </a>
                    <a href="tel:+1234567890" className="icon">
                        <FaPhone />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
