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

  const trialNum = guesses.length;
  const trial2 = 0;

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
          <div className="current-guess">
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

App.defaultProps = {
  userName: 'Player 1',
  chatId: '',
  userId: ''
};

export default App;
