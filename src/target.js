import React, { useState, useEffect } from 'react';
import App from './App';
import './App.css';

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
      const response = await fetch(url, { method: 'GET' });
      setClicked(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="target-container">
      {!clicked ? (
        <div className="target-content">
          <div className="glass-card text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">
              <i className="bi bi-joystick me-2"></i>
              Guess My Number
            </h1>
            <p className="lead">A Modern Number Puzzle Challenge</p>
          </div>

          <div className="glass-card rules-section mb-5">
            <h2 className="text-center mb-4">
              <i className="bi bi-book me-2"></i>
              Game Rules
            </h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="rule-card">
                  <i className="bi bi-unique fs-1 mb-3"></i>
                  <h3>Unique Digits</h3>
                  <p>All digits must be distinct</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rule-card">
                  <i className="bi bi-123 fs-1 mb-3"></i>
                  <h3>Number Match (N)</h3>
                  <p>Correct digits in any position</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rule-card">
                  <i className="bi bi-geo-alt fs-1 mb-3"></i>
                  <h3>Position Match (O)</h3>
                  <p>Digits in correct position</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card text-center">
            <h2 className="mb-4">
              <i className="bi bi-key me-2"></i>
              Set Your Secret Number
            </h2>
            <div className="input-group justify-content-center">
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
                className="glow-button w-100"
                onClick={handleSubmit}
                disabled={!aim.trim()}
              >
                <i className="bi bi-play-fill me-2"></i>
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
