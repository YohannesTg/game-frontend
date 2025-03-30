import React from 'react';

export default function Header(props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Gradient background
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        fontFamily: "'Roboto', sans-serif", // Modern font
        fontSize: '1.2rem',
      }}
    >
      <div className="container">
        <div className="row mb-4">
          {/* User Name */}
          <div className="col-6 d-flex justify-content-start">
            <div
              style={{
                background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                color: "#ffffff",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "25px 0 0 25px",
                position: "relative",
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
              }}
            >
              {props.userName}
              <div
                style={{
                  content: "",
                  position: "absolute",
                  top: "50%",
                  right: "-10px",
                  transform: "translateY(-50%)",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  borderColor: "transparent transparent transparent #6a11cb",
                }}
              ></div>
            </div>
          </div>

          {/* Opponent Name */}
          <div className="col-6 d-flex justify-content-end">
            <div
              style={{
                background: "linear-gradient(90deg, #ff512f, #dd2476)",
                color: "#ffffff",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "0 25px 25px 0",
                position: "relative",
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
              }}
            >
              {props.oppName}
              <div
                style={{
                  content: "",
                  position: "absolute",
                  top: "50%",
                  left: "-10px",
                  transform: "translateY(-50%)",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  borderColor: "transparent #ff512f transparent transparent",
                }}
              ></div>
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
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    </div>
  );
}
