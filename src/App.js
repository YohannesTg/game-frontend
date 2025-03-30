import React, { useState } from 'react';
import Header from './Header';
import Guess from './Guess';

function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [trialNum, setTrialNum] = useState(0);
  const [trial2, setTrial2] = useState(0);

  const handleNewGuess = (guess, n, o) => {
    setGuesses(prev => [...prev, { guess, n, o }]);
    setTrialNum(prev => prev + 1);
    
    // Update scores based on game logic
    if(n === 4 && o === 4) {
      setScore1(prev => prev + 1);
    }
  };

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName}
        oppName={props.oppName}
        score1={score1}
        score2={score2}
        trialNum={trialNum}
        trial2={trial2}
      />
      
      <div className="game-content">
        <div className="guess-history">
          {/* Header Row */}
          <div className="guess-header">
            <span>Guess</span>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span>N</span>
              <span>O</span>
            </div>
          </div>

          {/* Guess Items */}
          {guesses.map((item, index) => (
            <div key={index} className="guess-item">
              <div className="guess-number">{item.guess}</div>
              <div className="guess-results">
                <div className="result-bubble n-result">{item.n}</div>
                <div className="result-bubble o-result">{item.o}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Guess Input */}
        <Guess 
          onNewGuess={handleNewGuess}
          chatId={props.chatId}
          userId={props.userId}
          setTrial2={setTrial2}
        />
      </div>
    </div>
  );
}

export default App;
