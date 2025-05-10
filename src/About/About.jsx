import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="about-container">
      <h1>{t.whatIs}</h1>
      <div className="about-content">
        <p className="about-intro">{t.aboutDescription}</p>
        
        <section className="how-it-works">
          <h2>{t.keyFeatures}</h2>
          <ul>
            <li>{t.feature1}</li>
            <li>{t.feature2}</li>
            <li>{t.feature3}</li>
            <li>{t.feature4}</li>
          </ul>
        </section>

        <section className="benefits-section">
          <h2>{t.aboutBenefits}</h2>
          <ul>
            <li>{t.benefit1}</li>
            <li>{t.benefit2}</li>
            <li>{t.benefit3}</li>
          </ul>
        </section>

        <Link to="/" className="about-cta">
          {t.aboutCallToAction}
        </Link>
      </div>
    </div>
  );
};

export default About; 