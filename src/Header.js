import React from 'react';

export default function Header({ userName, oppName, score1, score2, trialNum }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          {/* Player 1 */}
          <div className="player-1">
            <div className="score-value">{userName}</div>
            <div className="score-label">Score: {score1} | Trials: {trialNum}</div>
          </div>

          {/* Player 2 */}
          <div className="player-2">
            <div className="score-value">{oppName || 'Opponent'}</div>
            <div className="score-label">Score: {score2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
