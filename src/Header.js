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
        background: 'rgba(16, 18, 27, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 0',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="container">
        <div className="row mb-4 align-items-center">
          {/* User Name */}
          <div className="col-6 d-flex justify-content-start">
            <div className="glass-card px-3 py-2 d-flex align-items-center">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              <span className="fw-medium">{props.userName}</span>
            </div>
          </div>

          {/* Opponent Name */}
          <div className="col-6 d-flex justify-content-end">
            <div className="glass-card px-3 py-2 d-flex align-items-center">
              <i className="bi bi-person-fill me-2 text-danger"></i>
              <span className="fw-medium">{props.oppName}</span>
            </div>
          </div>
        </div>

        {/* Scores and Trials Section */}
        <div className="row justify-content-center g-3">
          <div className="col-md-5">
            <div className="glass-card p-3 text-center">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Your Score</span>
                <span className="fw-bold text-success">{props.score1}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Trials</span>
                <span className="fw-bold text-info">{props.trialNum}</span>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="glass-card p-3 text-center">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Opponent Score</span>
                <span className="fw-bold text-success">{props.score2}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Trials</span>
                <span className="fw-bold text-info">{props.trial2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
