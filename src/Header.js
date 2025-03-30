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
        <div className="row align-items-center gx-4">
          {/* User Section */}
          <div className="col-6 d-flex gap-3">
            <div className="glass-card p-2 px-3">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-person-fill text-primary"></i>
                <div>
                  <div className="score-value">{props.score1}</div>
                  <div className="score-label">Score</div>
                </div>
                <div className="vr mx-2"></div>
                <div>
                  <div className="score-value text-info">{props.trialNum}</div>
                  <div className="score-label">Trials</div>
                </div>
              </div>
            </div>
          </div>

          {/* Opponent Section */}
          <div className="col-6 d-flex justify-content-end">
            <div className="glass-card p-2 px-3">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <div className="score-value text-danger">{props.score2}</div>
                  <div className="score-label">Score</div>
                </div>
                <div className="vr mx-2"></div>
                <div>
                  <div className="score-value text-warning">{props.trial2}</div>
                  <div className="score-label">Trials</div>
                </div>
                <i className="bi bi-person-fill text-danger"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
