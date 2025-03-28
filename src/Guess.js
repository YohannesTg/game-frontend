import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import './Guess.css'; // Import the CSS file for styling

const Guess = ({ chatId, userId, oppName, gameScore, NewGuess }) => {
  const [clicked, setClicked] = useState(false);
  const [guess, setGuess] = useState('');
  const [numberState, setNumberState] = useState(0);
  const [orderState, setOrderState] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const inputRef = useRef(null);

  // Fetch opponent username with retries if needed
  useEffect(() => {
    const fetchOpponentUsername = async () => {
      try {
        const response = await fetch(
          `https://gamechecker.vercel.app/opponent?chatId=${chatId}&userId=${userId}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        oppName(data.userName);
      } catch (error) {
        console.error('Error fetching opponent username:', error);
      }
    };

    fetchOpponentUsername();
    inputRef.current?.focus();
  }, [chatId, userId, oppName]);

  // Trigger server check
  const checkOnServer = async () => {
    try {
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${chatId}&userId=${userId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setNumberState(data.number);
      setOrderState(data.order);
      gameScore(data.trial2, data.score1, data.score2);

      if (data.order === 4 && data.number === 4) {
        setGameResult('win');
        alert('CONGRATULATIONS');
        setConfetti(true);
      } else {
        setGameResult('loss');
        NewGuess();
      }
    } catch (error) {
      console.error('Error during server communication:', error);
    }
  };

  const handleClick = () => {
    checkOnServer();
    setClicked((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const change = inputValue[inputValue.length - 1];
    if (!inputValue.slice(0, inputValue.length - 1).includes(parseInt(change))) {
      if (inputValue.length <= 4) {
        setGuess(inputValue);
      } else {
        setGuess(inputValue.slice(0, 4));
      }
    }
  };

  return (
    <>
      {confetti && <Confetti />}
      <div className="guess-container">
        <input
          className="guess-input"
          value={guess}
          type="number"
          readOnly={clicked}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button className="guess-button" onClick={handleClick} disabled={clicked}>
          GO
        </button>
        <div className="guess-info">
          <div>Number: {numberState}</div>
          <div>Order: {orderState}</div>
        </div>
      </div>
    </>
  );
};

export default Guess;
