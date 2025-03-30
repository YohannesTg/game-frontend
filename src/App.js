import React from 'react';
import Guess from './Guess';
import Header from './Header';

function App(props) {
  const [trailNum, setTrailNum] = React.useState([1]);
  const [opponentUsername, setOpponentUsername] = React.useState("");
  const [trial2, setTrial2] = React.useState(1);
  const [score1, setScore1] = React.useState(0);
  const [score2, setScore2] = React.useState(0);

  const gameScore = (newTrial2, newScore1, newScore2) => {
    setTrial2(newTrial2);
    setScore1(newScore1);
    setScore2(newScore2);
  };

  const NewGuess = () => {
    setTrailNum(prev => [...prev, prev[prev.length - 1] + 1);
  };

  return (
    <div className="container-fluid">
      <Header
        userName={props.userName}
        oppName={opponentUsername}
        trialNum={trailNum.length}
        trial2={trial2}
        score1={score1}
        score2={score2}
      />

      <div className="game-content">
        <div className="container">
          {trailNum.map((value) => (
            <Guess
              key={value}
              chatId={props.chatId}
              userId={props.userId}
              gameScore={gameScore}
              NewGuess={NewGuess}
              oppName={setOpponentUsername}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
