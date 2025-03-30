import React from 'react';
import Guess from './Guess';
import Header from './Header';

function App(props) {
  const [trailNum, setTrialNum] = React.useState([1]);
  const [opponentUsername, setOpponentUsername] = React.useState("");
  const [trial2, setTrial2] = React.useState(1);
  const [score1, setScore1] = React.useState(0);
  const [score2, setScore2] = React.useState(0);
  const [numberState, setNumberState] = React.useState(0);
  const [orderState, setOrderState] = React.useState(0);

  function gameScore(trialB, scoreA, scoreB, number, order) {
    setTrial2(trialB);
    setScore1(scoreA);
    setScore2(scoreB);
    setNumberState(number);
    setOrderState(order);
  }

  function oppName(name) {
    setOpponentUsername(name);
    console.log(name);
  }

  function NewGuess() {
    setTrialNum((prevValue) => [...prevValue, prevValue[prevValue.length - 1] + 1]);
  }

  return (
   <div className="container-fluid">
      <Header
        trialNum={trailNum.length}
        userName={props.userName}
        oppName={opponentUsername}
        trial2={trial2}
        score1={score1}
        score2={score2}
        numberState={numberState}
        orderState={orderState}
      />

      <div style={{
        marginTop: '220px',
        maxHeight: 'calc(100vh - 220px)',
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
              oppName={setOpponentUsername}
              name={value}
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
