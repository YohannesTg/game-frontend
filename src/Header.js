import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

export default function Header({ userName, oppName, score1, score2, trialNum, trial2 }) {
  return (
    <div className="header-container">
      <div className="player-info">
        <div className="player-card">
          <div className="player-name">
            <Icon icon="mdi:account" />
            {userName}
          </div>
          <div className="score-label">
            <span>Score: {score1}</span>
            <span>Trials: {trialNum}</span>
          </div>
        </div>
        
        <div className="player-card">
          <div className="opponent-name">
            <Icon icon="mdi:account-group" />
            {oppName || 'Waiting...'}
          </div>
          <div className="score-label">
            <span>Score: {score2}</span>
            <span>Trials: {trial2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  oppName: PropTypes.string,
  score1: PropTypes.number.isRequired,
  score2: PropTypes.number.isRequired,
  trialNum: PropTypes.number.isRequired,
  trial2: PropTypes.number.isRequired
};

Header.defaultProps = {
  oppName: 'Waiting...'
};
