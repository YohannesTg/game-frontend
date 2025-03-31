import React, { useState, useEffect } from 'react';
import Header from './Header';
import Guess from './Guess';

function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = React.useRef(null);

  const handleNewGuess = (guess, n, o) => {
    setGuesses(prev => [{ guess, n, o }, ...prev]);
    if(n === 4 && o === 4) {
      setScore1(prev => prev + 1);
      setGameWon(true);
    }
  };

  const trialNum = guesses.length;
  const trial2 = 0;

  useEffect(() => {
    if(!gameWon) {
      inputRef.current?.focus();
    }
  }, [guesses, gameWon]);

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName || 'Player 1'}
        oppName={opponentUsername}
        score1={score1}
        score2={score2}
        trialNum={trialNum}
        trial2={trial2}
      />
      
      <div className="game-content">
        <table className="trials-table">
          <thead>
            <tr>
              <th>Guess</th>
              <th>N</th>
              <th>O</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((guess, index) => (
              <tr key={index}>
                <td>{guess.guess}</td>
                <td>{guess.n}</td>
                <td>{guess.o}</td>
              </tr>
            ))}
            <tr className="input-row">
              <td colSpan="3">
                <div style={{ padding: '1rem', display: 'grid', gap: '1rem', gridTemplateColumns: '1fr auto' }}>
                  <input
                    ref={inputRef}
                    className="secret-input"
                    type="number"
                    value={inputValue}
                    onChange={(e) => {
                      const input = e.target.value;
                      if(input.length <= 4 && /^\d*$/.test(input) && new Set(input).size === input.length) {
                        setInputValue(input);
                      }
                    }}
                    placeholder="____"
                    disabled={isSubmitting || gameWon}
                    maxLength="4"
                    inputMode="numeric"
                  />
                  <button
                    className="glow-button"
                    disabled={inputValue.length !== 4 || isSubmitting || gameWon}
                    onClick={async () => {
                      try {
                        setIsSubmitting(true);
                        const response = await fetch(
                          `https://gamechecker.vercel.app/check?guess=${inputValue}&chatId=${props.chatId}&userId=${props.userId}`
                        );
                        const data = await response.json();
                        handleNewGuess(inputValue, data.number, data.order);
                        setInputValue('');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {isSubmitting ? 'Checking...' : 'Check'}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

App.defaultProps = {
  userName: 'Player 1',
  chatId: '',
  userId: ''
};

export default App;
