import React from 'react';
import './Contact.css';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <div className="contact-container">
      <h1>{t.contactUs}</h1>
      <div className="contact-form">
        <form>
          <div className="form-group">
            <label htmlFor="name">{t.name}</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t.message}</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit">{t.sendMessage}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 