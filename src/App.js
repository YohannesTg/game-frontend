import React, { useState, useEffect } from 'react';
import Header from './Header';
import Guess from './Guess';

function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [trialNum, setTrialNum] = useState(0);
  const [trial2, setTrial2] = useState(0);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [gameWon, setGameWon] = useState(false);

  const handleNewGuess = (guess, n, o) => {
    setGuesses(prev => [...prev, { guess, n, o }]);
    setTrialNum(prev => prev + 1);
    
    if(n === 4 && o === 4) {
      setScore1(prev => prev + 1);
      setTrial2(prev => prev + 1);
      setGameWon(true);
    }
  };

  const handleReplay = () => {
    window.location.reload(); // Reset the game
  };

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName}
        oppName={opponentUsername}
        score1={score1}
        score2={score2}
        trialNum={trialNum}
        trial2={trial2}
      />
      
      <div className="game-content">
        <div className="guess-history">
          <div className="guess-header">
            <span>Guess</span>
            <span>N</span>
            <span>O</span>
          </div>
          
          {guesses.map((item, index) => (
            <div key={index} className="guess-item">
              <div className="guess-number">{item.guess}</div>
              <div className="result-number n-result">{item.n}</div>
              <div className="result-number o-result">{item.o}</div>
            </div>
          ))}
        </div>

        {!gameWon ? (
          <Guess 
            onNewGuess={handleNewGuess}
            setOpponent={setOpponentUsername}
            chatId={props.chatId}
            userId={props.userId}
            setTrial2={setTrial2}
          />
        ) : (
          <div className="replay-container">
            <button 
              className="replay-button"
              onClick={handleReplay}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
