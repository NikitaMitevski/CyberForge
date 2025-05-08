import React from 'react';
import { useState } from 'react';
import './LinkForm.css';

const LinkForm = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidUrl = (string) => {
    try {
      const url = new URL(string.startsWith('http') ? string : `https://${string}`);
      // Check for valid domain structure (at least one dot and valid TLD)
      const domainParts = url.hostname.split('.');
      if (domainParts.length < 2) return false;
      
      // Check for common TLDs and minimum length
      const validTLD = /\.(com|net|org|edu|gov|mil|biz|info|name|museum|coop|aero|[a-z]{2,})$/i;
      if (!validTLD.test(url.hostname)) return false;
      
      // Check minimum length and valid characters
      if (url.hostname.length < 4) return false;
      if (!/^[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/.test(url.hostname)) return false;

      return true;
    } catch (err) {
      return false;
    }
  };

  const checkUrl = async () => {
    if (!url) {
      setResult("Ве молиме внесете URL");
      return;
    }

    const cleanUrl = url.trim();
    
    if (!isValidUrl(cleanUrl)) {
      setResult("Ве молиме внесете валиден URL (пр. www.example.com)");
      return;
    }

    try {
      setIsLoading(true);
      setResult(null);
      
      const urlToCheck = url.startsWith('http') ? url : `https://${url}`;
      
      const res = await fetch('http://localhost:5173/api/check-link', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: urlToCheck.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Server error');
      }

      setResult(data.safe ? "Вашиот линк е безбеден!" : "Вашиот линк е опасен, бидете внимателни!");
    } catch (error) {
      console.error('Error:', error);
      setResult(`Се случи грешка: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="linkform-bg">
      <div className="link-form-container">
        <input 
          type="text" 
          className="link-form-input"
          placeholder="Enter your link here"
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        <button 
          className="link-form-button" 
          onClick={checkUrl}
          disabled={isLoading}
        >
          {isLoading ? 'Checking...' : 'Check URL'}
        </button>
        {result && <div className="result-message">{result}</div>}
      </div>
    </div>
  );
};

export default LinkForm;
