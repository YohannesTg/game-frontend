import React, { useState } from 'react';
import App from './App';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function Target() {
  const [aim, setAim] = useState('');
  const [clicked, setClicked] = useState(true);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
      const change=inputValue[inputValue.length-1]
      parseInt(inputValue)
    if (!inputValue.slice(0,inputValue.length-1).includes(parseInt(change))){
    if (inputValue.length <= 4) {
      setAim(inputValue);
    } else {
      setAim(inputValue.slice(0, 4));
    }
     }
  };

  return (<div >
   
      {clicked ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }} >
        <div className="container text-center">
          <div className="row">
          <h1 className="text-white">Welcome to the Guessing Game</h1>
          <div className="col-3 input-group input-group-lg">
            <input
              type="text"
              className="form-control bg-secondary text-center text-white shadow-lg"
              value={aim}
              onChange={handleInputChange}
            />
            <button
              onClick={() => setClicked((clicked) => !clicked)}
              className="btn btn-primary shadow-lg"
            >
              SET
            </button>
          </div>
          </div>
        </div>
        </div>
      ) : (
        <App target={aim} />
      )}
      </div>
    
  );
}