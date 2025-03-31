import React, { useState } from 'react';
import Header from './Header';
import Guess from './Guess';

function App(props) {
  const [guesses, setGuesses] = useState([]);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [opponentUsername, setOpponentUsername] = useState('');
  const [gameWon, setGameWon] = useState(false);

  const handleNewGuess = (guess, n, o) => {
    setGuesses(prev => [...prev, { guess, n, o }]);
    if(n === 4 && o === 4) {
      setScore1(prev => prev + 1);
      setGameWon(true);
    }
  };

  // Calculate trials count
  const trialNum = guesses.length;
  const trial2 = 0; // Replace with actual opponent trials if available

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
        <table className="trials-table">
          <thead>
            <tr>
              <th>N</th>
              <th>O</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length: 5}, (_, n) => 
              Array.from({length: 5}, (_, o) => (
                <tr key={`${n}-${o}`}>
                  <td>{n}</td>
                  <td>{o}</td>
                  <td>
                    {guesses.filter(g => g.n === n && g.o === o).length}
                  </td>
                </tr>
              ))
            ).flat()}
          </tbody>
        </table>

        {!gameWon ? (
          <Guess 
            onNewGuess={handleNewGuess}
            setOpponent={setOpponentUsername}
            chatId={props.chatId}
            userId={props.userId}
          />
        ) : (
          <div className="text-center mt-4">
            <button 
              className="glow-button"
              onClick={() => window.location.reload()}
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
