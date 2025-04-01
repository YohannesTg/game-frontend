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
          {/* Golden Hero Section */}
          <div className="golden-hero text-center">
            <h1 className="display-4 fw-bold golden-gradient mb-4">
              <i className="bi bi-stars me-3 golden-icon"></i>
              CodeBreaker Challenge
              <i className="bi bi-stars ms-3 golden-icon"></i>
            </h1>
            <p className="lead golden-text">Decrypt the Digital Enigma</p>
          </div>

          {/* Golden Rules Grid */}
          <div className="golden-glass rules-section">
            <h2 className="section-title golden-gradient mb-4">
              <i className="bi bi-shield-lock me-2"></i>
              Decryption Rules
            </h2>
            <div className="golden-rules-grid">
              <div className="golden-rule-card">
                <div className="golden-icon">
                  <i className="bi bi-fingerprint"></i>
                </div>
                <h3 className="golden-text">Unique Sequence</h3>
                <p className="golden-subtext">All ciphers must be distinct</p>
              </div>
              
              <div className="golden-rule-card">
                <div className="golden-icon">
                  <i className="bi bi-puzzle"></i>
                </div>
                <h3 className="golden-text">Cipher Match (N)</h3>
                <p className="golden-subtext">Correct digits in any position</p>
              </div>
              
              <div className="golden-rule-card">
                <div className="golden-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h3 className="golden-text">Position Lock (O)</h3>
                <p className="golden-subtext">Exact position matches</p>
              </div>
            </div>
          </div>

          {/* Golden Input Section */}
          <div className="golden-glass input-section">
            <div className="golden-input-group">
              <div className="input-header mb-4">
                <h2 className="golden-gradient">
                  <i className="bi bi-lock me-2"></i>
                  Set Encryption Key
                </h2>
                <p className="golden-subtext">Enter 4 unique ciphers to initiate</p>
              </div>
              
              <div className="golden-input-wrapper">
                <input
                  type="text"
                  className="golden-input"
                  value={aim}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="????"
                  maxLength="4"
                  inputMode="numeric"
                />
                <button 
                  className="golden-button mt-4"
                  onClick={handleSubmit}
                  disabled={!aim.trim()}
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Initiate Sequence
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
