import React from 'react';

export default function Header(props) {
  return (
    <div className="header-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(16, 18, 27, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 0',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div className="container">
        <div className="row g-2">
          {/* Player Names */}
          <div className="col-6">
            <div className="d-flex flex-column">
              <div className="player-name text-primary fw-bold mb-1">
                {props.userName}
              </div>
              <div className="d-flex gap-3">
                <div className="score-label">Score: {props.score1}</div>
                <div className="score-label">Trial: {props.trialNum}</div>
              </div>
            </div>
          </div>

          {/* Opponent Section */}
          <div className="col-6 text-end">
            <div className="d-flex flex-column align-items-end">
              <div className="player-name text-danger fw-bold mb-1">
                {props.oppName || "Opponent"}
              </div>
              <div className="d-flex gap-3">
                <div className="score-label">Score: {props.score2}</div>
                <div className="score-label">Trial: {props.trial2}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
