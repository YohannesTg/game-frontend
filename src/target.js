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
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      {!clicked ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="container">
            <div className="row mb-5">
              <div className="ticker-container">
                <div className="ticker-content">
                  🎮 Welcome to Guess My Number • 🚀 Modern UI Edition • 🏆 Compete with Friends
                </div>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-12">
                <div className="glass-card p-4 mx-auto" style={{ maxWidth: '800px' }}>
                  <h3 className="text-center mb-4 fw-bold">Game Rules</h3>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center mb-4">
                      <i className="bi bi-1-circle-fill me-3 fs-4 text-primary"></i>
                      <div>
                        <h5 className="mb-1">Unique Digits</h5>
                        <p className="mb-0 text-muted">All digits in your secret number must be unique</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center mb-4">
                      <i className="bi bi-2-circle-fill me-3 fs-4 text-info"></i>
                      <div>
                        <h5 className="mb-1">Number Match (N)</h5>
                        <p className="mb-0 text-muted">Count of correct digits regardless of position</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-3-circle-fill me-3 fs-4 text-success"></i>
                      <div>
                        <h5 className="mb-1">Position Match (O)</h5>
                        <p className="mb-0 text-muted">Count of digits in correct position</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="glass-card p-4">
                  <h4 className="text-center mb-4">
                    <i className="bi bi-lock-fill me-2"></i>
                    Enter Secret Number
                  </h4>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control modern-input text-center fs-3 py-3"
                      value={aim}
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                      onClick={handleSubmit}
                      className="glow-button btn btn-lg px-5"
                      disabled={!aim.trim()}
                    >
                      <i className="bi bi-check2-circle me-2"></i>
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
