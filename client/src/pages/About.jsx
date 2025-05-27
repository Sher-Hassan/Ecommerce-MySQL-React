import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 className="about-title">About Gizmo Fashion</h1>
        <p className="about-subtitle">Founded in 2025</p>
      </section>
      <section className="about-content">
        <div className="about-description">
          <h2>Our Story</h2>
          <p>
            Gizmo Fashion was established in 2025 with a singular vision: to revive the timeless elegance of old money apparel for both men and women. Our brand is dedicated to those who appreciate sophistication, understated luxury, and the enduring appeal of classic style.
          </p>
          <h2>Our Philosophy</h2>
          <p>
            We believe true fashion is not about trends, but about heritage and refinement. Every piece in our collection is designed to embody the grace, confidence, and subtle opulence that define the old money aesthetic.
          </p>
          <h2>For Men & Women</h2>
          <p>
            Our curated selection features premium fabrics, tailored silhouettes, and timeless designs for both men and women. Whether you seek the perfect blazer, a crisp shirt, or an elegant dress, Gizmo Fashion is your destination for enduring style.
          </p>
        </div>
        <div className="about-values">
          <h2>Why Choose Gizmo Fashion?</h2>
          <ul>
            <li>Classic black & white palette for effortless sophistication</li>
            <li>Premium quality and attention to detail</li>
            <li>Inclusive collections for both men and women</li>
            <li>Inspired by the legacy of old money fashion</li>
          </ul>
        </div>
      </section>
      <footer className="about-footer">
        <p>&copy; 2025 Gizmo Fashion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
