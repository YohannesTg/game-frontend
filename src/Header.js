import React from 'react';

export default function Guess(props) {
    return (
       <div className="container pt-4">
  <div className="row justify-content-between">
    {/* Opponent 1 Section */}
    <div className="col-4 col-sm-5">
      <div className="container">
        <div className="row text-white bg-secondary rounded-5" style={{ height: "30px" }}>
          <div className="col d-flex align-items-center justify-content-center">
            <span>{props.userName}</span>
          </div>
        </div>
        <div className="row bg-warning my-1 rounded-5">
          <div className="col d-flex align-items-center justify-content-center">
            <span>Score:</span>
            {props.score1}
          </div>
        </div>
        <div className="row bg-warning my-1 rounded-5">
          <div className="col d-flex align-items-center justify-content-center">
            <span>Trial:</span>
            {props.trialNum}
          </div>
        </div>
      </div>
    </div>

    {/* Opponent 2 Section */}
    <div className="col-4 col-sm-5">
      <div className="container">
        <div className="row text-white bg-secondary rounded-5" style={{ height: "30px" }}>
          <div className="col d-flex align-items-center  justify-content-center">
            <span>{props.oppName}</span>
          </div>
        </div>
        <div className="row bg-warning my-1 rounded-5">
          <div className="col d-flex align-items-center justify-content-center">
            <span>Score:</span>
            props.score2
          </div>
        </div>
        <div className="row bg-warning my-1 rounded-5">
          <div className="col d-flex align-items-center justify-content-center">
            <span>Trial:</span>
            {props.trial2}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row justify-content-center mt-3">
    <div className="col-2 col-md-1 btn btn-primary me-2">N</div>
    <div className="col-2 col-md-1 btn btn-primary">O</div>
  </div>
</div>
    );
}
