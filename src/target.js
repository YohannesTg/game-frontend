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
          {/* Header Card */}
          <div className="glass-card text-center mb-5">
            <h1 className="display-4 mb-3">
              <Icon icon="mdi:brain" className="gold-icon" />
              Code Breaker
            </h1>
            <p className="lead">A Modern Bulls & Cows Implementation</p>
          </div>

          {/* Rules Section */}
          <div className="glass-card rules-section mb-5">
            <h2 className="text-center mb-4">
              <Icon icon="mdi:gamepad-round" className="me-2" />
              Game Rules
            </h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="rule-card">
                  <Icon icon="mdi:lock-pattern" className="rule-icon" />
                  <h3>4-Digit Code</h3>
                  <p>Create a unique 4-digit number with no repeating digits</p>
                  <div className="rule-number">1</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rule-card">
                  <Icon icon="mdi:lightbulb-on" className="rule-icon" />
                  <h3>Bulls (N)</h3>
                  <p>Correct digits in wrong position</p>
                  <div className="rule-number">2</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rule-card">
                  <Icon icon="mdi:bullseye-arrow" className="rule-icon" />
                  <h3>Cows (O)</h3>
                  <p>Correct digits in right position</p>
                  <div className="rule-number">3</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="glass-card text-center">
            <h2 className="mb-4">
              <Icon icon="mdi:key-variant" className="me-2" />
              Set Secret Code
            </h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control secret-input mb-3"
                value={aim}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="____"
                maxLength="4"
                inputMode="numeric"
              />
              <button 
                className="glow-button"
                onClick={handleSubmit}
                disabled={!aim.trim()}
                style={{ marginTop: '1rem' }}
              >
                <Icon icon="mdi:rocket-launch" className="me-2" />
                Start Challenge
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
