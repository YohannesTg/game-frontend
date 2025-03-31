import React from 'react';
import { Icon } from '@iconify/react';

export default function Header({ userName, oppName, score1, score2 }) {
  return (
    <div className="header-container">
      <div className="container">
        <div className="player-info">
          <div className="player-card">
            <Icon icon="mdi:account" className="player-icon" />
            <div>
              <div className="player-name">{userName}</div>
              <div className="score-box">
                <Icon icon="mdi:trophy" className="score-icon" />
                <span>{score1}</span>
              </div>
            </div>
          </div>
          
          <div className="vs-badge">VS</div>

          <div className="player-card opponent">
            <Icon icon="mdi:account-group" className="player-icon" />
            <div>
              <div className="opponent-name">{oppName || 'Waiting...'}</div>
              <div className="score-box">
                <Icon icon="mdi:trophy" className="score-icon" />
                <span>{score2}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
