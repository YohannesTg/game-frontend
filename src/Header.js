import React from 'react';

export default function Guess(props) {
    return (
        <div className="container pt-4">
<div className="row justify-content-between mt-2 mb-3">
  {/* Opponent 1 Section */}
  <div className="col-3 col-sm-2">
    <div className="row text-white bg-secondary" style={{ height: "6 px" }}>{props.userName}</div>
      <div className="row btn btn-warning me-2">
        <span>Score:</span>
        3
      </div>
      <div className="row btn btn-warning me-2">
        <span>Trial:</span>
        {props.trialNum}
    </div>
    
  </div>

  {/* Opponent 2 Section */}
  <div className="col-3 col-sm-2">
    <div className="row text-white bg-secondary" style={{ height: "6 px" }}>{props.oppName}</div>
      <div className="row btn btn-warning me-2">
        <span>Score:</span>
        3
      </div>
      <div className="row btn btn-warning me-2">
        <span>Trial:</span>
        {props.trialNum}
    </div>
    
  </div>
</div>
            <div className="row justify-content-center mt-3">
                <div className="col-2 col-md-1 btn btn-primary me-2">
                    N
                </div>
                <div className="col-2 col-md-1 btn btn-primary">
                    O
                </div>
            </div>
        </div>
    );
}
