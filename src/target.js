import React, { useState, useEffect, useRef } from 'react';
import App from './App';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function Target() {
  const [aim, setAim] = useState('');
  const [clicked, setClicked] = useState(true);
  const [chatId, setChatId] = useState('');
  const [userId, setUserId] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Get the chat ID and user ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    setChatId(urlParams.get('chatId') || '');
    setUserId(urlParams.get('userId') || '');

    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const change = inputValue[inputValue.length - 1];
    parseInt(inputValue);
    if (!inputValue.slice(0, inputValue.length - 1).includes(parseInt(change))) {
      if (inputValue.length <= 4) {
        setAim(inputValue);
      } else {
        setAim(inputValue.slice(0, 4));
      }
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
      {clicked ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="container text-center">
            <div className="row">
              <h1 className="text-white">Welcome to the Guessing Game</h1>
              <div className="col-3 input-group input-group-lg">
                <input
                  ref={inputRef}
                  type="number"
                  className="form-control bg-secondary text-center text-white shadow-lg"
                  value={aim}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setClicked((clicked) => !clicked);
                      handleSubmit();
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setClicked((clicked) => !clicked);
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
