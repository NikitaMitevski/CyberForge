import React, { useState } from 'react';
import './ClickSafe.css';

function ClickSafe() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your URL checking logic here
  };

  return (
    <div className="clicksafe-container">
      <h1>Кликни безбедно</h1>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Внесете URL за проверка"
            className="url-input"
          />
          <button type="submit" className="check-button">
            Провери
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClickSafe;