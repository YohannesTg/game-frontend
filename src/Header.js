import React from 'react';

export default function Header({ userName, oppName, score1, score2, trialNum, trial2 }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          <div className="score-row">
            <div className="player-name">{userName}</div>
            <div className="score-label">
              <span className="golden-text">🏆{score1}</span>
              <span className="golden-text">🎯{trialNum}</span>
            </div>
          </div>
          
          <div className="score-row text-end">
            <div className="opponent-name">{oppName || '...'}</div>
            <div className="score-label">
              <span className="golden-text">🏆{score2}</span>
              <span className="golden-text">🎯{trial2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
