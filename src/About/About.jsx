import React from 'react';
import './About.css';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="about-container">
      <h1>{t.whatIs}</h1>
      <div className="about-content">
        <section className="description">
          <p>{t.aboutDescription}</p>
        </section>
        <section className="features">
          <h2>{t.keyFeatures}</h2>
          <ul>
            <li>{t.feature1}</li>
            <li>{t.feature2}</li>
            <li>{t.feature3}</li>
            <li>{t.feature4}</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About; 