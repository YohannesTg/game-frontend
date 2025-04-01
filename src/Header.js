import React from 'react';

export default function Header({ userName, oppName, score1, score2, trialNum, trial2 }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          <div>
            <div className="player-name">{userName}</div>
            <div className="score-label">
              <span className="golden-text">Score: {score1}</span> | 
              <span className="golden-text"> Trials: {trialNum}</span>
            </div>
          </div>
          
          <div className="text-end">
            <div className="opponent-name">{oppName || '...'}</div>
            <div className="score-label">
              <span className="golden-text">Score: {score2}</span> | 
              <span className="golden-text"> Trials: {trial2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
