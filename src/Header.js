import React from 'react';

export default function Guess(props) {
    return (
        <div className="container pt-4">
            <div className="row justify-content-start">
                <div className="col-auto d-flex flex-column align-items-center">
                    <div className='rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white mb-2' style={{ width: "40px", height: "40px" }}>
                        {props.trialNum}
                    </div>
                    <h5>{props.userName}</h5>
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
