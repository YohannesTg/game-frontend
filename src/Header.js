import React from 'react';

export default function Guess(props) {
    return (
        <div className="container pt-4">
        <div className="row justify-content-between mt-2 mb-3">
  {/* Opponent 1 Section */}
  <div className="col-3 text-start">
    <div className="row">
      <div className="col-6 btn btn-secondary me-2">3</div>
      <div className="col-6 btn btn-secondary me-2">{props.trailNum}</div>
    </div>
    <div className="text-white" style={{ height: "10px" }}>{props.userName}</div>
  </div>

  {/* Opponent 2 Section */}
  <div className="col-3 text-end">
    <div className="row">
      <div className="col-6 btn btn-secondary me-2">5</div>
      <div className="col-6 btn btn-secondary me-2">{props.trialNum}</div>
    </div>
    <div className="text-white" style={{ height: "10px" }}>{props.oppName}</div>
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
