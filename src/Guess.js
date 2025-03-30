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
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      />

      <div className="row justify-content-center mt-4 g-3">
        <div className="col-auto">
          <input
            className="form-control modern-input text-center"
            style={{
              width: '140px',
              fontSize: '1.4rem',
              letterSpacing: '0.5rem',
              padding: '12px',
            }}
            id="Ginput"
            value={guess}
            type="number"
            readOnly={clicked}
            onChange={handleInputChange}
            ref={inputRef}
            placeholder="____"
          />
        </div>
        
        <div className="col-auto d-flex gap-2">
          <div className="result-badge bg-primary">
            N: {numberState}
          </div>
          <div className="result-badge bg-success">
            O: {orderState}
          </div>
        </div>

        <div className="col-auto">
          <button 
            className={`glow-button btn btn-lg px-4 py-2 rounded-pill ${clicked && "opacity-50"}`}
            onClick={handleClick}
            disabled={clicked}
          >
            {clicked ? (
              <><i className="bi bi-hourglass-split me-2"></i>Checking...</>
            ) : (
              <><i className="bi bi-send-check me-2"></i>Check</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
