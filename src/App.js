import React, { useState } from 'react';
import Header from './Header';
import Guess from './Guess';

function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [trial1, setTrial1] = useState(0);
  const [trial2, setTrial2] = useState(0);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [gameWon, setGameWon] = useState(false);

  const handleNewGuess = (guess, n, o) => {
    setGuesses(prev => [...prev, { guess, n, o }]);
    setTrial1(prev => prev + 1);
    
    if(n === 4 && o === 4) {
      setScore1(prev => prev + 1);
      setTrial2(prev => prev + 1);
      setGameWon(true);
    }
  };

  const handleReplay = () => {
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName}
        oppName={opponentUsername}
        score1={score1}
        score2={score2}
        trial1={trial1}
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
            setTrial1={setTrial1}
            setTrial2={setTrial2}
            setScore1={setScore1}    
            setScore2={setScore2}
            score1={score1}    
            score2={score2}  
          />
        ) : (
          <div className="replay-container">
            <button 
              className="app-button replay-button"
              onClick={handleReplay}
            >
              <i className="bi bi-arrow-repeat me-2"></i>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
