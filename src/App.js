import React, { useState } from 'react';
import Header from './Header';
import Guess from './Guess';

function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [opponentUsername, setOpponentUsername] = useState('');

  const handleNewGuess = (guess, n, o) => {
    setGuesses(prev => [...prev, { guess, n, o }]);
    
    // Update scores based on game logic
    if(n === 4 && o === 4) {
      setScore1(prev => prev + 1);
    }
  };

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName}
        oppName={opponentUsername}
        score1={score1}
        score2={score2}
        trialNum={guesses.length}
      />
      
      <div className="game-content">
        {/* Guess History */}
        <div className="guess-history">
          {guesses.map((item, index) => (
            <div key={index} className="guess-item">
              <div className="guess-number">{item.guess}</div>
              <div className="guess-results">
                <div className="result-bubble n-result">N:{item.n}</div>
                <div className="result-bubble o-result">O:{item.o}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Guess Input */}
        <Guess 
          onNewGuess={handleNewGuess}
          setOpponent={setOpponentUsername}
          chatId={props.chatId}
          userId={props.userId}
        />
      </div>
    </div>
  );
}

export default App;
