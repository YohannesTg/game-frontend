import React from 'react';
import Guess from './Guess';
import Header from './Header';

function App(props) {
  const [guesses, setGuesses] = React.useState([]);
  const [opponentUsername, setOpponentUsername] = React.useState("");
  const [trial2, setTrial2] = React.useState(1);
  const [score1, setScore1] = React.useState(0);
  const [score2, setScore2] = React.useState(0);

  const gameScore = (newTrial2, newScore1, newScore2) => {
    setTrial2(newTrial2);
    setScore1(newScore1);
    setScore2(newScore2);
  };

  const NewGuess = (guess, numberState, orderState) => {
    setGuesses(prev => [
      ...prev,
      {
        value: guess,
        n: numberState,
        o: orderState,
        id: Date.now()
      }
    ]);
  };

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName}
        oppName={opponentUsername}
        trialNum={guesses.length}
        trial2={trial2}
        score1={score1}
        score2={score2}
      />

      <div className="game-content">
        <div className="container">
          {/* Existing guesses */}
          {guesses.map((guess) => (
            <div key={guess.id} className="guess-result">
              <div className="previous-guess">
                {guess.value}
                <div className="result-indicators">
                  <span className="n-indicator">{guess.n}</span>
                  <span className="o-indicator">{guess.o}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Current input */}
          <Guess
            key="current-guess"
            chatId={props.chatId}
            userId={props.userId}
            gameScore={gameScore}
            NewGuess={NewGuess}
            oppName={setOpponentUsername}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
