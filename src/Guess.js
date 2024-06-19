import React, { useState, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";

export default function Guess(props) {
  const [clicked, setClicked] = useState(false);
  const [guess, setGuess] = useState("");
  const [numberState, setNumberState] = useState(0);
  const [orderState, setOrderState] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  
  var confettiElement = document.getElementById('my-canvas');
  var confettiSettings = { target: confettiElement };
  var confetti = new ConfettiGenerator(confettiSettings);

  useEffect(() => {
    const fetchOpponentUsername = async () => {
      try {
        const response = await fetch(`https://gamechecker.vercel.app/opponent?chatId=${props.chatId}&userId=${props.userId}`,   {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        props.oppName(data.username);
      } catch (error) {
        console.error('Error fetching opponent username:', error);
        // Try again in 2 seconds
        setTimeout(() => {
          fetchOpponentUsername();
        }, 2000);
      }
    };

    fetchOpponentUsername();
  }, []);

  function trigger() {
    checkOnServer();
    setClicked((prevValue) => !prevValue);
  }

  function toggler(e) {
    const inputValue = e.target.value;
    const change = inputValue[inputValue.length - 1];
    parseInt(inputValue);
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
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${props.chatId}&userId=${props.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log(`https://gamechecker.vercel.app/check?guess=${guess}&chatId=${props.chatId}&userId=${props.userId}`);
      console.log(data);

      setNumberState(data.Number);
      setOrderState(data.Order);

      if (data.Order === 4 && data.Number === 4) {
        setGameResult("win");
        alert("CONGRATULATIONS");
        confetti.render();
      } else {
        setGameResult("loss");
        props.NewGuess();
      }
    } catch (error) {
      console.error('Error checking on server:', error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-4 ">
        <div className="col-3 col-md-3 col-lg-1">
          <input
            className="form-control text-center me-2 px-0"
            style={{ "min-width": "40px" }}
            value={guess}
            type="number"
            readOnly={clicked}
            onChange={toggler}
          ></input>
        </div>
        <div className="col-2 col-md-1 btn btn-secondary me-2">{numberState}</div>
        <div className="col-2 col-md-1 btn btn-secondary me-2">{orderState}</div>
        <div className={`col-3 col-md-3 col-lg-1 btn btn-success ${clicked && "invisible"}`} onClick={() => { trigger() }}>
          GO
        </div>
        {gameResult === "win" && (
          <div
            className="col-3 col-md-3 col-lg-1 btn btn-primary"
            onClick={() => {
              setGuess("");
              setNumberState(0);
              setOrderState(0);
              setGameResult(null);
            }}
          >
            Replay
          </div>
        )}
      </div>
      {opponentUsername && <p>Opponent: {opponentUsername}</p>}
    </div>
  );
}
