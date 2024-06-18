
import React from 'react'
import Guess from './Guess'
import Header from './Header'



function App(props) { 
  
  const [trailNum, setTrialNum]=React.useState([1])  

  function NewGuess(){
setTrialNum((prevValue)=>[...prevValue, prevValue[prevValue.length-1]+1])
  }


  return(<div className="container-fluid text-center  ">
    <Header trialNum={trailNum.length} userName={props.userName}/>
 {trailNum.map((value)=><Guess key={value} chatId={props.chatId} userId={props.userId} name={value} NewGuess={NewGuess}/>)}

 
    </div>
  )
}
export default App;
