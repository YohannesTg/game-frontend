import React, { useState, useEffect } from 'react';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

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
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      console.log('Server response:', data);
      setClicked(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="target-container">
      {!clicked ? (
        <div className="target-content">
          {/* Hero Section */}
          <div className="hero-section text-center mb-5">
            <h1 className="display-4 fw-bold text-gradient">
              <i className="bi bi-joystick me-3"></i>
              Guess My Number
            </h1>
            <p className="lead text-muted">A Modern Number Puzzle Challenge</p>
          </div>

          {/* Rules Section */}
          <div className="glass-card rules-section mb-5">
            <h2 className="section-title">
              <i className="bi bi-book me-2"></i>
              Game Rules
            </h2>
            <div className="rules-grid">
              <div className="rule-card">
                <div className="rule-icon bg-primary">
                  <i className="bi bi-unique"></i>
                </div>
                <h3>Unique Digits</h3>
                <p>All digits must be distinct</p>
              </div>
              
              <div className="rule-card">
                <div className="rule-icon bg-info">
                  <i className="bi bi-123"></i>
                </div>
                <h3>Number Match (N)</h3>
                <p>Correct digits in any position</p>
              </div>
              
              <div className="rule-card">
                <div className="rule-icon bg-success">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h3>Position Match (O)</h3>
                <p>Digits in correct position</p>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="glass-card input-section">
            <div className="input-group">
              <div className="input-header mb-4">
                <h2>
                  <i className="bi bi-key me-2"></i>
                  Set Your Secret Number
                </h2>
                <p className="text-muted">Enter 4 unique digits to start the game</p>
              </div>
              
              <div className="number-input">
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
                  className="glow-button"
                  onClick={handleSubmit}
                  disabled={!aim.trim()}
                >
                  <i className="bi bi-play-fill me-2"></i>
                  Start Game
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <App chatId={chatId} userId={userId} userName={userName} />
      )}
    </div>
  );
}
