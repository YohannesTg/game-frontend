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

  useEffect(() => {
    // Get the chat ID and user ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    setChatId(urlParams.get('chatId') || '');
    setUserId(urlParams.get('userId') || '');
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 4 && /^\d*$/.test(inputValue)) {
      setAim(inputValue);
    }
  };

  const handleSubmit = () => {
    // Construct the URL with the necessary query parameters
    const url = `https://gamechecker.vercel.app/submit-data?chatId=${chatId}&userId=${userId}&inputValue=${aim}`;

    // Make the GET request
    fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {!clicked ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="container text-center">
            <div className="row">
              <h1 className="text-white">Welcome to the Guessing Game</h1>
              <div className="col-3 input-group input-group-lg">
                <input
                  type="text"
                  className="form-control bg-secondary text-center text-white shadow-lg"
                  value={aim}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setClicked(true);
                      handleSubmit();
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setClicked(true);
                    handleSubmit();
                  }}
                  className="btn btn-primary shadow-lg"
                >
                  SET
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <App chatId={chatId} userId={userId} />
      )}
    </div>
  );
}
