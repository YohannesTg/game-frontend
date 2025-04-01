import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import './App.css';

const successSound = new Howl({ src: ['/sounds/success.mp3'] });
const errorSound = new Howl({ src: ['/sounds/error.mp3'] });

function Guess({ onNewGuess, setOpponent, chatId, userId }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  const handleDigitChange = (index, value) => {
    if (/^\d$/.test(value) && !digits.includes(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      if (index < 3) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="guess-container">
      <div className="digit-grid">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`digit-input ${activeIndex === index ? 'active' : ''}`}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setActiveIndex(index)}
          />
        ))}
      </div>
      
      <button 
        className="cyber-button"
        disabled={digits.some(d => d === '')}
        onClick={() => {
          const guess = digits.join('');
          // Add your submission logic here
        }}
      >
        <span className="cyber-text">VALIDATE</span>
        <Icon icon="mdi:shield-check" className="button-icon" />
      </button>
    </div>
  );
}
