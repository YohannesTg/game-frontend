import React from 'react';
import Guess from './Guess';
import Header from './Header';

function App(props) {
  const [trailNum, setTrialNum] = React.useState([1]);
  const [opponentUsername, setOpponentUsername] = React.useState("");
  const [trial2, setTrial2] = React.useState(1);
  const [score1, setScore1] = React.useState(0);
  const [score2, setScore2] = React.useState(0);

  function gameScore(trialB, scoreA, scoreB) {
    setTrial2(trialB);
    setScore1(scoreA);
    setScore2(scoreB);
  }

  function NewGuess() {
    setTrialNum((prevValue) => [...prevValue, prevValue[prevValue.length - 1] + 1]);
  }

  return (
    <div className="container-fluid">
      <Header
        trialNum={trailNum.length}
        score1={score1}
        score2={score2}
        trial2={trial2}
      />

      <div style={{
        marginTop: '180px',
        maxHeight: 'calc(100vh - 180px)',
        overflowY: 'auto',
        padding: '2rem',
        scrollBehavior: 'smooth'
      }}>
        <div className="container">
          {trailNum.map((value) => (
            <Guess
              key={value}
              chatId={props.chatId}
              userId={props.userId}
              gameScore={gameScore}
              NewGuess={NewGuess}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
