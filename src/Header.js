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
        {/* Player Info Row */}
        <div className="row align-items-center mb-3 gx-4">
          <div className="col-md-8 d-flex align-items-center gap-4">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-person-fill text-primary fs-5"></i>
              <div>
                <div className="score-label">PLAYER</div>
                <div className="score-value" style={{color: '#6ab7ff'}}>
                  {props.userName || 'You'}
                </div>
              </div>
            </div>
            
            <div className="vr opacity-25"></div>
            
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-person-fill text-danger fs-5"></i>
              <div>
                <div className="score-label">OPPONENT</div>
                <div className="score-value" style={{color: '#ff6b6b'}}>
                  {props.oppName || 'Waiting...'}
                </div>
              </div>
            </div>
          </div>

          {/* N/O Indicators */}
          <div className="col-md-4 d-flex justify-content-end gap-4">
            <div className="text-center">
              <div className="score-label">CORRECT DIGITS</div>
              <div className="score-value text-primary">{props.numberState}</div>
            </div>
            <div className="text-center">
              <div className="score-label">CORRECT POSITION</div>
              <div className="score-value text-success">{props.orderState}</div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="glass-card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="score-label">YOUR SCORE</span>
                <span className="score-value text-success">{props.score1}</span>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="glass-card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="score-label">YOUR TRIALS</span>
                <span className="score-value text-info">{props.trialNum}</span>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="glass-card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="score-label">OPPONENT SCORE</span>
                <span className="score-value text-danger">{props.score2}</span>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="glass-card p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="score-label">OPPONENT TRIALS</span>
                <span className="score-value text-warning">{props.trial2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
