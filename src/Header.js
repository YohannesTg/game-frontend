import React from 'react';

export default function Header(props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure the header stays on top of other content
        backgroundColor: 'white', // Optional, to ensure readability
        padding: '10px', // Add some padding if necessary
      }}
    >
      {/* Names Section */}
      <div className="row mb-4">
        {/* User Name */}
        <div className="col-6 d-flex justify-content-start">
          <div
            style={{
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              color: "#ffffff",
              padding: "10px 10px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "20px 0 0 20px",
              position: "relative",
            }}
          >
            {props.userName}
          </div>
        </div>

        {/* Opponent Name */}
        <div className="col-6 d-flex justify-content-end">
          <div
            style={{
              background: "linear-gradient(90deg, #ff512f, #dd2476)",
              color: "#ffffff",
              padding: "10px 10px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "0 20px 20px 0",
              position: "relative",
            }}
          >
            {props.oppName}
          </div>
        </div>
      </div>

      {/* Scores and Trials Section */}
      <div className="row justify-content-between">
        <div className="col-5 col-md-5">
          <div className="container">
            <div
              className="row my-2 rounded-5"
              style={{
                background: "linear-gradient(90deg, #fbd786, #f7797d)",
                color: "#333333",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <div className="col d-flex align-items-center justify-content-center">
                <span>Score:</span>&nbsp;{props.score1}
              </div>
            </div>
            <div
              className="row my-2 rounded-5"
              style={{
                background: "linear-gradient(90deg, #fbd786, #f7797d)",
                color: "#333333",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <div className="col d-flex align-items-center justify-content-center">
                <span>Trial:</span>&nbsp;{props.trialNum}
              </div>
            </div>
          </div>
        </div>

        <div className="col-5 col-md-5">
          <div className="container">
            <div
              className="row my-2 rounded-5"
              style={{
                background: "linear-gradient(90deg, #fbd786, #f7797d)",
                color: "#333333",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <div className="col d-flex align-items-center justify-content-center">
                <span>Score:</span>&nbsp;{props.score2}
              </div>
            </div>
            <div
              className="row my-2 rounded-5"
              style={{
                background: "linear-gradient(90deg, #fbd786, #f7797d)",
                color: "#333333",
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <div className="col d-flex align-items-center justify-content-center">
                <span>Trial:</span>&nbsp;{props.trial2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
