import React, { useState, useRef, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-fallback">Game Error - Please Refresh</div>;
    }
    return this.props.children;
  }
}

function Guess({ onNewGuess, setOpponent, chatId, userId }) {
  const [guess, setGuess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confetti, setConfetti] = useState(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchOpponent = async () => {
      try {
        const response = await fetch(
          `https://gamechecker.vercel.app/opponent?chatId=${chatId}&userId=${userId}`
        );
        const data = await response.json();
        setOpponent(data.userName);
      } catch (error) {
        console.error('Error fetching opponent:', error);
      }
    };
    
    if(chatId && userId) fetchOpponent();
  }, [chatId, userId, setOpponent]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => {
      confetti?.clear();
    };
  }, [confetti]);

  const checkOnServer = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${chatId}&userId=${userId}`
      );
      const data = await response.json();
      
      if(data.order === 4 && data.number === 4) {
        if (canvasRef.current) {
          confetti?.clear();
          const newConfetti = new ConfettiGenerator({ 
            target: canvasRef.current,
            max: 200,
            animate: true,
            props: ['circle', 'square', 'triangle', 'line'],
            colors: [[165,104,246], [230,61,135], [0,199,228], [253,214,126]]
          });
          newConfetti.render();
          setConfetti(newConfetti);
        }
      }
      
      onNewGuess(guess, data.number, data.order);
      setGuess('');
      inputRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInput = (e) => {
    const input = e.target.value;
    if(input.length <= 4 && /^\d*$/.test(input) && new Set(input).size === input.length) {
      setGuess(input);
    }
  };

  return (
    <ErrorBoundary>
      <div className="current-guess">
        <canvas 
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 999
          }}
        />
        <input
          ref={inputRef}
          className="secret-input"
          type="number"
          value={guess}
          onChange={handleInput}
          placeholder="____"
          disabled={isSubmitting}
          maxLength="4"
        />
        <button
          className="glow-button"
          onClick={checkOnServer}
          disabled={guess.length !== 4 || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Icon icon="mdi:loading" className="loading-spinner" />
              Checking...
            </>
          ) : (
            <>
              <Icon icon="mdi:magic-staff" />
              Check
            </>
          )}
        </button>
      </div>
    </ErrorBoundary>
  );
}

Guess.propTypes = {
  onNewGuess: PropTypes.func.isRequired,
  setOpponent: PropTypes.func.isRequired,
  chatId: PropTypes.string,
  userId: PropTypes.string
};

export default Guess;
