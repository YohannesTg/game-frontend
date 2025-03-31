import React, { useState, useRef, useEffect } from 'react';
import ConfettiGenerator from "confetti-js";

export default function Guess({ onNewGuess, chatId, userId, setOpponent }) {
  const [guess, setGuess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

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

  const checkOnServer = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${chatId}&userId=${userId}`
      );
      const data = await response.json();
      onNewGuess(guess, data.number, data.order);
      setGuess('');
      inputRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="current-guess">
      <input
        ref={inputRef}
        className="form-control secret-input"
        type="number"
        value={guess}
        onChange={(e) => {
          const input = e.target.value;
          if(/^\d{0,4}$/.test(input) && new Set(input).size === input.length) {
            setGuess(input);
          }
        }}
        placeholder="____"
        disabled={isSubmitting}
      />
      <button
        className="glow-button"
        onClick={checkOnServer}
        disabled={guess.length !== 4 || isSubmitting}
      >
        {isSubmitting ? 'Checking...' : 'Check'}
      </button>
    </div>
  );
}
