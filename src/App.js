
import React from 'react'
import Guess from './Guess'
import Header from './Header'



function App(props) { 
  
  const [trailNum, setTrialNum]=React.useState([1])
  const [opponentUsername, setOpponentUsername] =React.useState("");
  const [trail2, setTrial2]=React.useState([1])
  const [score1, setScore1]=React.useState([0])
  const [score2, setScore2]=React.useState([0])

  function gameScore(trialB,scoreA, scoreB){
    setTrial2(trialB);
    setScore1(scoreA);
    setScore2(scoreB);
  }
  
  function oppName(name){
    setOpponentUsername(name)
    console.log(name)
  }

  function NewGuess(){
setTrialNum((prevValue)=>[...prevValue, prevValue[prevValue.length-1]+1])
  }


  return(<div className="container-fluid text-center  ">
    <Header trialNum={trailNum.length} userName={props.userName} oppName={opponentUsername} gameScore={gameScore} />

 {trailNum.map((value)=><Guess key={value} chatId={props.chatId} userId={props.userId} oppName={oppName} name={value} NewGuess={NewGuess}/>)}
      

 
    </div>
  )
}
export default App;
