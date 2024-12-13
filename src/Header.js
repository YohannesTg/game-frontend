import React from 'react';

export default function Guess(props) {
  return (
    <div className="container pt-4" style={{ position: 'relative', height: '100vh' }}>
      {/* Names Section */}
      <div className="row mb-4" style={{ position: 'absolute', top: '20px', width: '100%' }}>
        {/* User Name */}
        <div className="col-6 d-flex justify-content-start">
          <div
            style={{
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              color: "#ffffff",
              padding: "10px 20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "20px 0 0 20px",
              position: "relative",
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
              padding: "10px 20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "0 20px 20px 0",
              position: "relative",
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
      <div className="row justify-content-between" style={{ position: 'absolute', top: '130px', width: '100%' }}>
        {/* User Score and Trial */}
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

        {/* Opponent Score and Trial */}
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

      {/* Buttons Section */}
      <div className="row justify-content-center mt-4" style={{ position: 'absolute', top: '300px', width: '100%' }}>
        <div
          className="col-2 col-md-1 me-3"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: "10px",
            textAlign: "center",
            padding: "5px 10px",
          }}
        >
          N
        </div>
        <div
          className="col-2 col-md-1"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: "10px",
            textAlign: "center",
            padding: "5px 10px",
          }}
        >
          O
        </div>
      </div>
    </div>
  );
}
