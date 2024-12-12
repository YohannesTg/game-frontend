import React from 'react';

export default function Guess(props) {
  return (
    <div className="container pt-4">
      <div className="row justify-content-between">
        {/* Opponent 1 Section */}
        <div className="col-4 col-sm-5">
          <div className="container">
            <div
              className="row rounded-5"
              style={{
                background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                color: "#ffffff",
                height: "auto",
                fontSize: "1.2rem",
                fontWeight: "bold",
                wordWrap: "break-word",
                textAlign: "center",
                padding: "10px",
                maxWidth: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <div className="col">
                <span>{props.userName}</span>
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
                padding: "5px 10px",
              }}
            >
              <div className="col">
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
                padding: "5px 10px",
              }}
            >
              <div className="col">
                <span>Trial:</span>&nbsp;{props.trialNum}
              </div>
            </div>
          </div>
        </div>

        {/* Opponent 2 Section */}
        <div className="col-4 col-sm-5">
          <div className="container">
            <div
              className="row rounded-5"
              style={{
                background: "linear-gradient(90deg, #ff512f, #dd2476)",
                color: "#ffffff",
                height: "auto",
                fontSize: "1.2rem",
                fontWeight: "bold",
                wordWrap: "break-word",
                textAlign: "center",
                padding: "10px",
                maxWidth: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <div className="col">
                <span>{props.oppName}</span>
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
                padding: "5px 10px",
              }}
            >
              <div className="col">
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
                padding: "5px 10px",
              }}
            >
              <div className="col">
                <span>Trial:</span>&nbsp;{props.trial2}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="row justify-content-center mt-4">
        <div
          className="col-2 col-md-1 me-3"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
            cursor: "pointer",
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
            padding: "10px",
            cursor: "pointer",
          }}
        >
          O
        </div>
      </div>
    </div>
  );
}
