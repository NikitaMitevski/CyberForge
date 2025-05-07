import React from 'react';
import './LinkForm.css';

const LinkForm = () => {
  return (
    <div className="linkform-bg">
      <div className="link-form-container">
        <input 
          type="text" 
          className="link-form-input"
          placeholder="Enter your link here"
        />
        <button className="link-form-button">
          Shorten URL
        </button>
      </div>
    </div>
  );
};

export default LinkForm;
