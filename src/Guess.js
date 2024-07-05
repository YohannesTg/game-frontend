import React, { useState, useEffect, useRef } from 'react';
import ConfettiGenerator from "confetti-js";

export default function Guess(props) {
  const [clicked, setClicked] = useState(false);
  const [guess, setGuess] = useState("");
  const [numberState, setNumberState] = useState(0);
  const [orderState, setOrderState] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  
  const confettiElement = document.getElementById('my-canvas');
  const confettiSettings = { target: confettiElement };
  const confetti = new ConfettiGenerator(confettiSettings);
  
  const inputRef = useRef(null);

  useEffect(() => {
    // Fetch opponent username
    const fetchOpponentUsername = async () => {
      try {
        const response = await fetch('/api/opponent-username');
        const data = await response.json();
        setOpponentUsername(data.username);
      } catch (error) {
        console.error('Error fetching opponent username:', error);
      }
    };
    fetchOpponentUsername();

    // Focus the input field after the component is rendered
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function trigger() {
    checkOnServer();
    setClicked((prevValue) => !prevValue);
  }

  function toggler(e) {
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

  async function checkOnServer() {
    try {
      const response = await fetch('/api/check-guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess })
      });
      const data = await response.json();
      setNumberState(data.numberState);
      setOrderState(data.orderState);
      setGameResult(data.result);

      if (data.result === 'win') {
        confetti.render();
      }
    } catch (error) {
      console.error('Error checking guess on server:', error);
    }
  }

  return (
    <div className="row justify-content-center mt-2 ">
      <div className="col-3 col-md-3 col-lg-1">
        <input
          className="form-control text-center me-2 px-0"
          id="Ginput"
          style={{ "min-width": "40px" }}
          value={guess}
          type="number"
          readOnly={clicked}
          onChange={toggler}
          autoFocus
          ref={inputRef}
        />
      </div>
      <div className="col-2 col-md-1 btn btn-secondary me-2">{numberState}</div>
      <div className="col-2 col-md-1 btn btn-secondary me-2">{orderState}</div>
      <div className={`col-3 col-md-3 col-lg-1 btn btn-success ${clicked && "invisible"}`} onClick={() => { trigger() }}>
        GO
      </div>
      {gameResult === 'win' && (
        <div className="row justify-content-center mt-2">
          <div className="col-12 text-center">
            <h3>You win!</h3>
          </div>
        </div>
      )}
      {gameResult === 'lose' && (
        <div className="row justify-content-center mt-2">
          <div className="col-12 text-center">
            <h3>You lose.</h3>
          </div>
        </div>
      )}
    </div>
  );
}
