import React, { useState, useEffect } from 'react';
import App from './App';
import './App.css';
import { Icon } from '@iconify/react';

export default function Target() {
  const [aim, setAim] = useState('');
  const [clicked, setClicked] = useState(false);
  const [chatId, setChatId] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setChatId(urlParams.get('chatId') || '');
    setUserId(urlParams.get('userId') || '');
    setUserName(urlParams.get('userName') || '');
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const hasUniqueDigits = new Set(inputValue).size === inputValue.length;
    if (inputValue.length <= 4 && /^\d*$/.test(inputValue) && hasUniqueDigits) {
      setAim(inputValue);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `https://gamechecker.vercel.app/submit-data?chatId=${chatId}&userId=${userId}&inputValue=${aim}&userName=${userName}`;
      await fetch(url, { method: 'GET' });
      setClicked(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="target-container">
      {!clicked ? (
        <div className="target-content">
          <div className="glass-card text-center">
            <h1 className="mb-3" style={{ fontSize: '2.5rem' }}>
              <Icon icon="mdi:brain" className="me-2" />
              Code Breaker
            </h1>
            <p className="text-secondary mb-4">A Modern Bulls & Cows Implementation</p>
          </div>

          <div className="glass-card rules-section">
            <h2 className="text-center mb-4">
              <Icon icon="mdi:gamepad-round" className="me-2" />
              How to Play
            </h2>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="rule-card">
                  <Icon icon="mdi:lock-pattern" className="rule-icon" />
                  <h3>4-Digit Code</h3>
                  <p>Create a unique 4-digit number with no repeating digits</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rule-card">
                  <Icon icon="mdi:lightbulb-on" className="rule-icon" />
                  <h3>N (Numbers)</h3>
                  <p>Correct digits in wrong position</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rule-card">
                  <Icon icon="mdi:bullseye-arrow" className="rule-icon" />
                  <h3>O (Order)</h3>
                  <p>Correct digits in right position</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card text-center">
            <h2 className="mb-4">
              <Icon icon="mdi:key-variant" className="me-2" />
              Set Secret Code
            </h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control secret-input"
                value={aim}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="____"
                maxLength="4"
                inputMode="numeric"
              />
              <button 
                className="glow-button mt-3"
                onClick={handleSubmit}
                disabled={!aim.trim()}
                style={{ width: '100%' }}
              >
                <Icon icon="mdi:play" className="me-2" />
                Start Game
              </button>
            </div>
          </div>
        </div>
      ) : (
        <App chatId={chatId} userId={userId} userName={userName} />
      )}
    </div>
  );
}
