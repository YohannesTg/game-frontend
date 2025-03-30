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
    // Parse URL query string parameters safely
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

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error while making server request:', error);
    }

    setClicked(true); // Trigger navigation *only after server call completes*
  };

  return (
        <div style={{ 
      minHeight: '100vh',
      overflowY: 'auto',
      background: 'linear-gradient(45deg, #0f0c29 0%, #302b63 100%)' 
    }}>
      {!clicked ? (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="container py-5 flex-grow-1">
            {/* Ticker Section */}
            <div className="row mb-5">
              <div className="ticker-container">
                <div className="ticker-content">
                  🎮 GUESS MY NUMBER • 🚀 MODERN EDITION • 🏆 COMPETE WITH FRIENDS
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="row mb-5">
              <div className="col-12 col-lg-10 mx-auto">
                <div className="glass-card p-4 p-lg-5">
                  <h2 className="text-center mb-4 fw-bold" style={{color: '#6ab7ff'}}>
                    <i className="bi bi-info-circle me-2"></i>
                    Game Rules
                  </h2>
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="text-center p-3">
                        <i className="bi bi-unique text-primary fs-1 mb-3"></i>
                        <h4 className="text-primary mb-2">Unique Digits</h4>
                        <p className="text-muted mb-0">All digits must be distinct</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center p-3">
                        <i className="bi bi-123 text-info fs-1 mb-3"></i>
                        <h4 className="text-info mb-2">Number Match (N)</h4>
                        <p className="text-muted mb-0">Correct digits in any position</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center p-3">
                        <i className="bi bi-geo-alt text-success fs-1 mb-3"></i>
                        <h4 className="text-success mb-2">Position Match (O)</h4>
                        <p className="text-muted mb-0">Digits in correct position</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="glass-card p-4">
                  <h3 className="text-center mb-4" style={{color: '#ff6b6b'}}>
                    <i className="bi bi-key-fill me-2"></i>
                    Enter Secret Number
                  </h3>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control modern-input text-center fs-3 py-3"
                      style={{letterSpacing: '0.5rem'}}
                      value={aim}
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="4 digits"
                    />
                    <button
                      onClick={handleSubmit}
                      className="glow-button btn btn-lg px-5"
                      disabled={!aim.trim()}
                      style={{background: 'var(--primary-gradient)'}}
                    >
                      <i className="bi bi-play-fill me-2"></i>
                      Start Game
                    </button>
                  </div>
                </div>
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
