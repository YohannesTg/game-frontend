import React from 'react';
import { Icon } from '@iconify/react';

export default function Header({ userName, oppName, score1, score2, trialNum, trial2 }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          <div className="player-card">
            <div className="player-name">
              <Icon icon="mdi:account" className="me-2" />
              {userName}
            </div>
            <div className="score-label">
              <span>Score: {score1}</span>
              <span>Trials: {trialNum}</span>
            </div>
          </div>

          <div className="player-card">
            <div className="opponent-name">
              <Icon icon="mdi:account-group" className="me-2" />
              {oppName || '...'}
            </div>
            <div className="score-label">
              <span>Score: {score2}</span>
              <span>Trials: {trial2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
