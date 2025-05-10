import React from 'react';
import './Home.css';
import LinkForm from '../LinkForm/LinkForm';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div className="home-container">
      <h1>{t.heroTitle}</h1>
      <div className="home-content">
        <p>{t.heroSubtitle}</p>
      </div>
      <LinkForm />
    </div>
  );
};

export default Home; 