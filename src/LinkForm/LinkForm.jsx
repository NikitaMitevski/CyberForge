import React from 'react';
import { useState } from 'react';
import './LinkForm.css';
import groupImg from '../assets/Group1000001000.png';
import frameImg from '../assets/Frame.png';
import GlobeSection from '../GlobeSection/GlobeSection';

const LinkForm = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultType, setResultType] = useState('');

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
      setResultType('warning');
      return;
    }

    const cleanUrl = url.trim();
    
    if (!isValidUrl(cleanUrl)) {
      setResult("Ве молиме внесете валиден URL (пр. www.example.com)");
      setResultType('warning');
      return;
    }

    try {
      setIsLoading(true);
      setResult(null);
      setResultType('');
      
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
        let type = 'danger';
        if (data.error === 'Domain does not exist' || data.error === 'Website is not reachable') {
          errorMsg = "Внесениот линк не постои или не е достапен.";
        } else if (data.error) {
          errorMsg += data.error;
        }
        if (data.suspicious) {
          errorMsg += " (ВНИМАНИЕ: Линкот изгледа сомнително!)";
          type = 'warning';
        }
        setResult(errorMsg);
        setResultType(type);
        throw new Error(errorMsg);
      }

      // Build natural, context-aware combined message and type
      let message = '';
      let type = 'secure';
      if (data.safe) {
        if (data.suspicious && data.urlhaus) {
          message = "Линкот е сигурен, но е пријавен како малициозен на URLhaus и покажува знаци на сомнителност.";
          type = 'danger';
        } else if (data.suspicious) {
          message = "Линкот е сигурен, но покажува знаци на сомнителност.";
          type = 'warning';
        } else if (data.urlhaus) {
          message = "Линкот е сигурен, но е пријавен како малициозен на URLhaus!";
          type = 'danger';
        } else {
          message = "Вашиот линк е безбеден!";
          type = 'secure';
        }
      } else {
        if (data.suspicious && data.urlhaus) {
          message = "Линкот е опасен, е пријавен како малициозен на URLhaus и покажува знаци на сомнителност.";
          type = 'danger';
        } else if (data.suspicious) {
          message = "Линкот е опасен, и покажува знаци на сомнителност.";
          type = 'danger';
        } else if (data.urlhaus) {
          message = "Линкот е опасен и е пријавен како малициозен на URLhaus!";
          type = 'danger';
        } else {
          message = "Вашиот линк е опасен, бидете внимателни!";
          type = 'danger';
        }
      }
      setResult(message);
      setResultType(type);
    } catch (error) {
      console.error('Error:', error);
      // setResult(error.message); // Already set above
      // setResultType('danger'); // Already set above
    } finally {
      setIsLoading(false);
    }
  }

  // Reset input when user starts typing after result
  const handleInputChange = (e) => {
    if (result) {
      setResult(null);
      setResultType('');
    }
    setUrl(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkUrl();
    }
  };

  return (
    <div className="linkform-bg">
      <div className="link-form-container">
        <div className="input-reset-wrapper">
          {result && (
            <button
              className="reset-btn"
              type="button"
              onClick={() => {
                setResult(null);
                setResultType('');
                setUrl('');
              }}
              aria-label="Reset input"
            >
              <span className="visually-hidden">Clear</span>
              <svg className="trash-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <g>
                  <rect className="trash-lid" x="7" y="2" width="10" height="3" rx="1" />
                  <rect x="3" y="6" width="18" height="14" rx="2"/>
                  <path d="M9 10v6M15 10v6"/>
                  <line x1="1" y1="6" x2="23" y2="6"/>
                </g>
              </svg>
            </button>
          )}
          <input 
            type="text" 
            className={`link-form-input${result ? ` result-in-input result-${resultType}` : ''}`}
            placeholder="Enter your link here"
            value={result ? result : url}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress} // Trigger on Enter key press
            disabled={isLoading}
            readOnly={!!result}
          />
        </div>
        <button 
          className="link-form-button" 
          onClick={checkUrl}
          disabled={isLoading || !!result}
        >
          <span>
            {isLoading ? 'Checking...' : 'Check URL'}
          </span>
        </button>
      </div>
      {/* <img src={groupImg} alt='Planet' className="link-form-image"/> */}
      <img src={frameImg} alt='Frame' className="link-form-frame"/>
      <GlobeSection />
    </div>
  );
};

export default LinkForm;
