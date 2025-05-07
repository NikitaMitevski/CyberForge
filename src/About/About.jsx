import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>What is CyberForge?</h1>
      <div className="about-content">
        <section className="description">
          <p>CyberForge is a leading cybersecurity platform dedicated to protecting businesses and individuals from digital threats.</p>
        </section>
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>Advanced Threat Detection</li>
            <li>Real-time Monitoring</li>
            <li>24/7 Security Support</li>
            <li>Custom Security Solutions</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About; 