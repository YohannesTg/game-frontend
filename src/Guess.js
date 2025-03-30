import React, { useState, useEffect, useRef } from 'react';
import ConfettiGenerator from "confetti-js";

export default function Guess(props) {
  const [clicked, setClicked] = useState(false);
  const [guess, setGuess] = useState("");
  const [numberState, setNumberState] = useState(0);
  const [orderState, setOrderState] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const [confetti, setConfetti] = useState(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  // Fetch opponent username with retries if needed
  useEffect(() => {
    const fetchOpponentUsername = async () => {
      try {
        const response = await fetch(
          `https://gamechecker.vercel.app/opponent?chatId=${props.chatId}&userId=${props.userId}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        props.oppName(data.userName);
      } catch (error) {
        console.error('Error fetching opponent username:', error);
      }
    };

    fetchOpponentUsername();
    inputRef.current?.focus();
  }, [props.chatId, props.userId, props.oppName]);

  // Trigger server check
  async function checkOnServer() {
    try {
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${props.chatId}&userId=${props.userId}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setNumberState(data.number);
      setOrderState(data.order);
      props.gameScore(data.trial2, data.score1, data.score2);

      if (data.order === 4 && data.number === 4) {
        setGameResult("win");
        alert("CONGRATULATIONS");

        // Trigger confetti
        if (canvasRef.current && !confetti) {
          const confettiInstance = new ConfettiGenerator({ target: canvasRef.current });
          confettiInstance.render();
          setConfetti(confettiInstance);
        }
      } else {
        setGameResult("loss");
        props.NewGuess();
      }
      setClicked(true);
    } catch (error) {
      console.error('Error during server communication:', error);
    }
  }

  function handleClick() {
    checkOnServer();
    setClicked((prev) => !prev);
  }

  function handleInputChange(e) {
    const inputValue = e.target.value;
    const change = inputValue[inputValue.length - 1];
    if (!inputValue.slice(0, inputValue.length - 1).includes(parseInt(change))) {
      if (inputValue.length <= 4) {
        setGuess(inputValue);
      } else {
        setGuess(inputValue.slice(0, 4));
      }
    }
  }

  return (
      <>
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }} />

      <div className="guess-container">
        {!clicked ? (
          <div className="guess-row">
            <input
              className="form-control modern-input"
              style={{
                flex: '1 1 auto',
                fontSize: '1.2rem',
                letterSpacing: '0.5rem',
                padding: '12px 20px',
              }}
              id="Ginput"
              value={guess}
              type="number"
              readOnly={clicked}
              onChange={handleInputChange}
              ref={inputRef}
              placeholder="____"
            />
            
            <button 
              className="glow-button btn rounded-pill px-4"
              onClick={handleClick}
            >
              <i className="bi bi-send-check me-2"></i>Check
            </button>
          </div>
        ) : (
          <div className="result-row">
            <div className="n-indicator bg-primary">{numberState}</div>
            <div className="o-indicator bg-success">{orderState}</div>
          </div>
        )}
      </div>
    </>
  );
}
