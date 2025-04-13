import React from 'react';

export default function Header({ userName, oppName, score1, score2, trial1, trial2 }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          <div className="player-column">
            <div className="player-name">{userName}</div>
            <div className="score-label">
              <span className="golden-text">🏆 {score1}</span>
              <span className="golden-text">🎯 {trial1}</span>
            </div>
          </div>
          
          <div className="player-column text-end">
            <div className="opponent-name">{oppName || '...'}</div>
            <div className="score-label">
              <span className="golden-text">🏆 {score2}</span>
              <span className="golden-text">🎯 {trial2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
