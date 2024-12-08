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
    if (inputValue.length <= 4 && /^\d*$/.test(inputValue)) {
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
    <div>
      {!clicked ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="container text-center w-100">
            {/* Welcome Message */}
            <div className="row mb-3">
              <div className="ticker-container">
                <div className="ticker-content">
                  Welcome to the Guess My Number (GMN) game
                </div>
              </div>
            </div>
            {/* Input + Button Responsive Row */}
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="input-group input-group-lg mb-3">
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
                  />
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary shadow-sm"
                    disabled={!aim.trim()}
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
