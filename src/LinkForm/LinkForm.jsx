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
        // Show a specific message if the backend says the domain does not exist or is unreachable
        let errorMsg = "Се случи грешка: ";
        if (data.error === 'Domain does not exist' || data.error === 'Website is not reachable') {
          errorMsg = "Внесениот линк не постои или не е достапен.";
        } else if (data.error) {
          errorMsg += data.error;
        }
        if (data.suspicious) {
          errorMsg += " (ВНИМАНИЕ: Линкот изгледа сомнително!)";
        }
        throw new Error(errorMsg);
      }

      let message = data.safe
        ? "Вашиот линк е безбеден!"
        : "Вашиот линк е опасен, бидете внимателни!";

      if (data.urlhaus) {
        message += " (Овој линк е пријавен како малициозен на URLhaus!)";
      }
      if (data.suspicious) {
        message += " (ВНИМАНИЕ: Линкот изгледа сомнително!)";
      }

      setResult(message);
    } catch (error) {
      console.error('Error:', error);
      setResult(error.message);
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
