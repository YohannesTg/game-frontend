import React from 'react'

export default function Guess(props){
    return(
      <div className="container pt-4">
      <div className='row rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white' style={{width: "40px", height: "40px"}}>{props.trialNum}</div>
      <div className="row justify-content-center">
        
        <div className="col-2 col-md-1 btn btn-primary me-2" >
  N
        </div>
        <div className="col-2 col-md-1 btn btn-primary" >
  O
        </div>
      </div>
      </div>
      
      
    )
}
