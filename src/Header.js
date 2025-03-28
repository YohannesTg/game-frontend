import React, { useState, useEffect } from 'react';
import './Header.css'; // Import the CSS file for styling

const Header = ({ trialNum, userName, oppName, trial2, score1, score2 }) => {
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle scroll events
  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className="header-content">
        <div className="user-info">
          <div className="user-name">{userName}</div>
          <div className="user-score">Score: {score1}</div>
          <div className="user-trial">Trial: {trialNum}</div>
        </div>
        <div className="opponent-info">
          <div className="opponent-name">{oppName}</div>
          <div className="opponent-score">Score: {score2}</div>
          <div className="opponent-trial">Trial: {trial2}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
