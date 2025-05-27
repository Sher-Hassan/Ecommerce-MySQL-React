import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and Description */}
                <div className="footer-section about">
                    <h3>GIZMO FASHION</h3>
                    <p>Your one-stop shop for the best deals and products. We’re committed to delivering quality, affordability, and satisfaction.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="footer-section customer-service">
                    <h4>Customer Service</h4>
                    <ul>
                        <li>FAQs</li>
                        <li>Returns</li>
                        <li>Shipping Info</li>
                        <li>Support Center</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} GIZMO FASHION All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
