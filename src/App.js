
import React from 'react'
import Guess from './Guess'
import Header from './Header'



function App(props) { 
  
  const [trailNum, setTrialNum]=React.useState([1])
  const [opponentUsername, setOpponentUsername] =React.useState("");

  function oppName(name){
    setOpponentUsername(name)
    console.log(name)
  }

  function NewGuess(){
setTrialNum((prevValue)=>[...prevValue, prevValue[prevValue.length-1]+1])
  }


  return(<div className="container-fluid text-center  ">
    <Header trialNum={trailNum.length} userName={props.userName} oppName={opponentUsername} />
  <div id="Ginput>
 {trailNum.map((value)=><Guess key={value} chatId={props.chatId} userId={props.userId} oppName={oppName} name={value} NewGuess={NewGuess}/>)}
      
 </div>
 
    </div>
  )
}
export default App;
