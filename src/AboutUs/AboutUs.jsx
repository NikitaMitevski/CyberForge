import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>At CyberForge, we are dedicated to providing cutting-edge cybersecurity solutions to protect businesses and individuals in the digital age.</p>
        </section>
        <section className="team">
          <h2>Our Team</h2>
          <p>We are a team of experienced cybersecurity professionals committed to excellence and innovation.</p>
        </section>
        <section className="values">
          <h2>Our Values</h2>
          <ul>
            <li>Security First</li>
            <li>Client Trust</li>
            <li>Innovation</li>
            <li>Excellence</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 