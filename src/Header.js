import React from 'react';

export default function Header({ userName, oppName, score1, score2, trialNum, trial2 }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          <div>
            <div className="player-name">{userName}</div>
            <div className="score-label">
              Score: {score1} | Trials: {trialNum}
            </div>
          </div>
          
          <div className="text-end">
            <div className="opponent-name">{oppName || 'Opponent'}</div>
            <div className="score-label">
              Score: {score2} | Trials: {trial2}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
