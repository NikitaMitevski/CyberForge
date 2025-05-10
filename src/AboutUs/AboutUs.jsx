import React from 'react';
import './AboutUs.css';
import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();
  
  return (
    <div className="about-container">
      <h1>{t.aboutUs}</h1>
      <div className="about-content">
        <section className="mission">
          <h2>{t.ourMission}</h2>
          <p>{t.missionDescription}</p>
        </section>
        <section className="team">
          <h2>{t.ourTeam}</h2>
          <p>{t.teamDescription}</p>
        </section>
        <section className="values">
          <h2>{t.ourValues}</h2>
          <ul>
            <li>{t.value1}</li>
            <li>{t.value2}</li>
            <li>{t.value3}</li>
            <li>{t.value4}</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 