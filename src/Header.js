import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import './App.css';

export default function Header({ userName, oppName, score1, score2, trialNum, trial2 }) {
  const isLeading = score1 > score2;
  
  return (
    <div className="header-container">
      <div className="player-grid">
        {/* Player 1 Card */}
        <div className={`player-card ${isLeading ? 'leading' : ''}`}>
          <div className="player-header">
            <Icon icon="mdi:account-supervisor" className="player-icon" />
            <span className="player-name glow-text">{userName}</span>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <Icon icon="mdi:sword-cross" className="stat-icon" />
              <span className="stat-value">{score1}</span>
            </div>
            <div className="stat-item">
              <Icon icon="mdi:history" className="stat-icon" />
              <span className="stat-value">{trialNum}</span>
            </div>
          </div>
        </div>

        {/* VS Badge */}
        <div className="vs-badge">
          <span className="vs-text">VS</span>
        </div>

        {/* Player 2 Card */}
        <div className={`player-card ${!isLeading ? 'leading' : ''}`}>
          <div className="player-header">
            <Icon icon="mdi:account-supervisor" className="player-icon" />
            <span className="player-name glow-text">{oppName || 'Challenger'}</span>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <Icon icon="mdi:sword-cross" className="stat-icon" />
              <span className="stat-value">{score2}</span>
            </div>
            <div className="stat-item">
              <Icon icon="mdi:history" className="stat-icon" />
              <span className="stat-value">{trial2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
