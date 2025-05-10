import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-container">
          <button className="chatbot-close" onClick={toggleChat}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <iframe 
            src="https://page.botpenguin.com/681f50eb3d871a6c56653184/681f50cd69f4b6e8a1e1774b"
            title="CyberForge Chatbot"
            className="chatbot-iframe"
            allow="microphone"
          />
        </div>
      )}
      <button className="chatbot-button" onClick={toggleChat}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    </div>
  );
};

export default Chatbot; 