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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <div className="container w-100" style={{ maxWidth: '100%' }}>
            {/* Welcome Message */}
            <div className="row mb-3">
              <div className="ticker-container">
                <div className="ticker-content">
                  Welcome to the Guess My Number (GMN) game
                </div>
              </div>
            </div>
            {/* Notes Section */}
            <div className="row mb-3">
                <ul className="list-unstyled medium" style={{ color: 'white', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  <li>1. Your secret number must have unique digits.</li>
                  <li>2. "N" indicates correct digits, regardless of position.</li>
                  <li>3. "O" indicates correct digits in the correct position.</li>
                </ul>
            </div>
            {/* Input + Button Responsive Row */}
            <div className="row justify-content-center align-items-center">
              <div className="col-8">
                <div className="input-group input-group-lg mb-3" style={{ maxWidth: '100%' }}>
                  <input
                    type="text"
                    className="form-control bg-secondary text-center text-white shadow-sm"
                    value={aim}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                    style={{ maxWidth: '100%', overflowWrap: 'break-word' }}
                  />
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary shadow-sm"
                    disabled={!aim.trim()}
                    style={{ maxWidth: '100%' }}
                  >
                    SET
                  </button>
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
