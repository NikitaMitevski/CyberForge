import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  return (
    <div className="services-container">
      <h1>{t.whySecurity}</h1>
      <div className="services-content">
        <p className="security-intro">{t.securityIntro}</p>
        
        <section className="risks-section">
          <h2>{t.risksTitle}</h2>
          <ul>
            <li>{t.risk1}</li>
            <li>{t.risk2}</li>
            <li>{t.risk3}</li>
          </ul>
        </section>

        <section className="protection-section">
          <h2>{t.protectionTitle}</h2>
          <ul>
            <li>{t.protection1}</li>
            <li>{t.protection2}</li>
            <li>{t.protection3}</li>
          </ul>
        </section>

        <Link to="/" className="security-cta">
          {t.securityCallToAction}
        </Link>
      </div>
    </div>
  );
};

export default Services; 