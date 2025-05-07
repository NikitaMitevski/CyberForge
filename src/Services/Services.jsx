import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Why Security?</h1>
      <div className="services-content">
        <section className="security-importance">
          <h2>The Importance of Cybersecurity</h2>
          <p>In today's digital world, security is not just an option - it's a necessity. Our services help protect your digital assets and maintain your peace of mind.</p>
        </section>
        <section className="our-services">
          <h2>Our Services</h2>
          <div className="service-grid">
            <div className="service-item">
              <h3>Network Security</h3>
              <p>Protect your network infrastructure from unauthorized access and threats.</p>
            </div>
            <div className="service-item">
              <h3>Data Protection</h3>
              <p>Safeguard your sensitive data with advanced encryption and security measures.</p>
            </div>
            <div className="service-item">
              <h3>Security Consulting</h3>
              <p>Expert guidance on implementing and maintaining security protocols.</p>
            </div>
            <div className="service-item">
              <h3>Incident Response</h3>
              <p>24/7 support for handling security incidents and breaches.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services; 