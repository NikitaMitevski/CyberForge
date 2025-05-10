import React, { useState, useCallback, useMemo } from 'react';
import './LinkForm.css';
import groupImg from '../assets/Group1000001000.png';
import frameImg from '../assets/Frame.png';
import GlobeSection from '../GlobeSection/GlobeSection';
import { useLanguage } from '../context/LanguageContext';

const LinkForm = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultType, setResultType] = useState('');
  const { t } = useLanguage();

  // Memoize the URL validation function
  const isValidUrl = useCallback((string) => {
    try {
      const url = new URL(string.startsWith('http') ? string : `https://${string}`);
      const domainParts = url.hostname.split('.');
      if (domainParts.length < 2) return false;
      
      const validTLD = /\.(com|net|org|edu|gov|mil|biz|info|name|museum|coop|aero|[a-z]{2,})$/i;
      if (!validTLD.test(url.hostname)) return false;
      
      if (url.hostname.length < 4) return false;
      if (!/^[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/.test(url.hostname)) return false;

      return true;
    } catch (err) {
      return false;
    }
  }, []);

  // Memoize the check URL function
  const checkUrl = useCallback(async () => {
    if (!url) {
      setResult(t.enterUrl);
      setResultType('warning');
      return;
    }

    const cleanUrl = url.trim();
    
    if (!isValidUrl(cleanUrl)) {
      setResult(t.notExist);
      setResultType('warning');
      return;
    }

    try {
      setIsLoading(true);
      setResult(null);
      setResultType('');
      
      const urlToCheck = url.startsWith('http') ? url : `https://${url}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch('http://localhost:5173/api/check-link', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: urlToCheck.trim() }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        let errorMsg = t.error;
        let type = 'danger';
        if (data.error === 'Domain does not exist' || data.error === 'Website is not reachable') {
          errorMsg = t.notExist;
        } else if (data.error) {
          errorMsg += data.error;
        }
        if (data.suspicious) {
          errorMsg += " (" + t.suspicious + ")";
          type = 'warning';
        }
        setResult(errorMsg);
        setResultType(type);
        throw new Error(errorMsg);
      }

      let message = '';
      let type = 'secure';

      if (data.safe) {
        if (data.suspicious && data.urlhaus) {
          message = t.warning;
          type = 'danger';
        } else if (data.suspicious) {
          message = t.warning;
          type = 'warning';
        } else if (data.urlhaus) {
          message = t.warning;
          type = 'danger';
        } else {
          message = t.safe;
          type = 'secure';
        }
      } else {
        if (data.suspicious && data.urlhaus) {
          message = t.dangerous;
          type = 'danger';
        } else if (data.suspicious) {
          message = t.dangerous;
          type = 'danger';
        } else if (data.urlhaus) {
          message = t.dangerous;
          type = 'danger';
        } else {
          message = t.dangerous;
          type = 'danger';
        }
      }
      setResult(message);
      setResultType(type);
    } catch (error) {
      if (error.name === 'AbortError') {
        setResult(t.error + ' Request timeout');
        setResultType('danger');
      } else {
        console.error('Error:', error);
        setResult(t.error + ' ' + error.message);
        setResultType('danger');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, t, isValidUrl]);

  const handleInputChange = useCallback((e) => {
    if (result) {
      setResult(null);
      setResultType('');
    }
    setUrl(e.target.value);
  }, [result]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      checkUrl();
    }
  }, [checkUrl]);

  const handleReset = useCallback(() => {
    setResult(null);
    setResultType('');
    setUrl('');
  }, []);

  // Memoize the input class name
  const inputClassName = useMemo(() => {
    return `link-form-input${result ? ` result-in-input result-${resultType}` : ''}`;
  }, [result, resultType]);

  return (
    <div className="linkform-bg">
      <div className="link-form-container">
        <div className="input-reset-wrapper">
          {result && (
            <button
              className="reset-btn"
              type="button"
              onClick={handleReset}
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
            className={inputClassName}
            placeholder={t.enterUrl}
            value={result ? result : url}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            disabled={isLoading || !!result}
          />
        </div>
        <button 
          className="link-form-button" 
          onClick={checkUrl}
          disabled={isLoading || !!result}
        >
          <span>
            {isLoading ? t.checking : t.checkUrl}
          </span>
        </button>
      </div>
      <img src={frameImg} alt='Frame' className="link-form-frame" loading="lazy"/>
      <GlobeSection />
    </div>
  );
};

export default React.memo(LinkForm);
