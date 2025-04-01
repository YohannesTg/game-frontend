import React, { useState, useRef, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";

export default function Guess({ onNewGuess, chatId, userId, setOpponent, setTrial2 }) {
  const [guess, setGuess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch opponent name
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

  // Confetti setup
  useEffect(() => {
    let confetti;
    if(canvasRef.current) {
      confetti = new ConfettiGenerator({ target: canvasRef.current });
    }
    return () => {
      if(confetti) confetti.clear();
    }
  }, []);

  // Auto-focus after submission completes
  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

  const checkOnServer = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${chatId}&userId=${userId}`
      );
      const data = await response.json();
      
      if(data.order === 4 && data.number === 4) {
        ConfettiGenerator({ target: canvasRef.current }).render();
      }
      
      onNewGuess(guess, data.number, data.order);
      setTrial2(prev => prev + 1);
      setGuess('');
      
      setTimeout(() => inputRef.current?.focus(), 0);
    } catch(error) {
      console.error('Error:', error);
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
    <>
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1000
      }} />

      <div className="current-guess">
        <div className="input-group">
          <input
            ref={inputRef}
            className="guess-input"
            type="text"  // Changed from number for better mobile UX
            value={guess}
            onChange={handleInput}
            placeholder="____"
            disabled={isSubmitting}
            maxLength="4"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          
          <button
            className="app-button check-button"
            onClick={checkOnServer}
            disabled={guess.length !== 4 || isSubmitting}
            tabIndex="-1"
          >
            <i className="bi bi-search me-2"></i>
            {isSubmitting ? 'Checking...' : 'Check Guess'}
          </button>
        </div>
      </div>
    </>
  );
}
