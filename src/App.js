import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import ConfettiGenerator from "confetti-js";
import { Icon } from '@iconify/react';

export default function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if(gameWon) {
      new ConfettiGenerator({
        target: canvasRef.current,
        max: 200,
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [[165,104,246], [230,61,135], [0,199,228], [253,214,126]]
      }).render();
    }
  }, [gameWon]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [guesses]);

  const handleSubmit = async (guess) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${props.chatId}&userId=${props.userId}`
      );
      const data = await response.json();
      
      setGuesses(prev => [{ guess, n: data.number, o: data.order }, ...prev]);
      
      if(data.number === 4 && data.order === 4) {
        setScore1(prev => prev + 1);
        setGameWon(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointer-events: 'none',
        z-index: 999
      }} />
      
      <Header
        userName={props.userName}
        oppName={opponentUsername}
        score1={score1}
        score2={score2}
        trialNum={guesses.length}
        trial2={0}
      />

      <div className="game-content">
        <div className="guess-list">
          {guesses.map((item, index) => (
            <div key={index} className="guess-item">
              <span className="guess-number">{item.guess}</span>
              <div className="result-badge n-badge">{item.n}</div>
              <div className="result-badge o-badge">{item.o}</div>
            </div>
          ))}
        </div>

        {!gameWon && (
          <div className="current-guess">
            <input
              ref={inputRef}
              className="secret-input"
              type="number"
              value={inputValue}
              onChange={(e) => {
                const val = e.target.value;
                if(val.length <= 4 && /^\d*$/.test(val) && new Set(val).size === val.length) {
                  setInputValue(val);
                }
              }}
              placeholder="____"
              disabled={isSubmitting}
              maxLength="4"
            />
            <button
              className="glow-button"
              onClick={async () => {
                if(inputValue.length === 4) {
                  await handleSubmit(inputValue);
                  setInputValue('');
                }
              }}
              disabled={inputValue.length !== 4 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon icon="mdi:loading" className="loading-spinner" />
                  Checking...
                </>
              ) : 'Check'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

App.defaultProps = {
  userName: 'Player 1',
  chatId: '',
  userId: ''
};
