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
      {/* Canvas for confetti */}
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

      {/* Main Game UI */}
      <div className="row justify-content-center mt-2">
        <div className="col-3 col-md-3 col-lg-1">
          <input
            className="form-control text-center me-2 px-0"
            id="Ginput"
            style={{ minWidth: "40px" }}
            value={guess}
            type="number"
            readOnly={clicked}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </div>
        <div className="col-2 col-md-1 btn btn-secondary me-2">{numberState}</div>
        <div className="col-2 col-md-1 btn btn-secondary me-2">{orderState}</div>
        <div
          className={`col-3 col-md-3 col-lg-1 btn btn-success ${clicked && "invisible"}`}
          onClick={handleClick}
        >
          GO
        </div>
      </div>
    </>
  );
}
