
import React from 'react'
import Guess from './Guess'
import Header from './Header'



function App(props) { 
 
  
  const [trailNum, setTrialNum]=React.useState([1])
  const actualNum=props.target
  

  function NewGuess(){
setTrialNum((prevValue)=>[...prevValue, prevValue[prevValue.length-1]+1])
  }


  return(<div className="container-fluid text-center  ">
    <Header trialNum={trailNum.length}/>
 {trailNum.map((value)=><Guess key={value} name={value}  actualNum={actualNum} NewGuess={NewGuess}/>)}

 
    </div>
  )
}
export default App;