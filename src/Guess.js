import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Guess({ 
  onNewGuess, 
  chatId, 
  userId, 
  setOpponent, 
  setTrial2, 
  setScore1, 
  setScore2, 
  score1, 
  score2 
}) {
  const [guess, setGuess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoss, setShowLoss] = useState(false);
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
        setScore1(data.score1);
        setScore2(data.score2);
        setTrial1(data.trial1);
        setTrial1(data.trial2);
      } catch (error) {
        console.error('Error fetching opponent:', error);
      }
    };

    if (chatId && userId) fetchOpponent();
  }, [chatId, userId, setOpponent, setScore2]);

  // Auto-focus after submission completes
  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

  const runConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
  };

  const checkOnServer = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `https://gamechecker.vercel.app/check?guess=${guess}&chatId=${chatId}&userId=${userId}`
      );
      const data = await response.json();

      if (data.score2 !== score2) {
        setShowLoss(true);
        setScore2(data.score2);
        return;
      }

      if (data.order === 4 && data.number === 4) {
        runConfetti();
      }

      onNewGuess(guess, data.number, data.order);
      setTrial2((prev) => prev + 1);
      setGuess('');

      setTimeout(() => inputRef.current?.focus(), 0);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInput = (e) => {
    const input = e.target.value;
    if (input.length <= 4 && 
        /^\d*$/.test(input) && 
        new Set(input).size === input.length) {
      setGuess(input);
    }
  };

  const handleReplay = () => {
    window.location.reload();
  };

  const renderContent = () => {
    if (showLoss) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(12px)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a2e 100%)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
            maxWidth: '90%',
            width: '500px',
            margin: '1rem'
          }}>
            <picture>
              <source 
                srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.webp" 
                type="image/webp" 
              />
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif"
                alt="😭"
                style={{
                  width: '160px',
                  height: '160px',
                  marginBottom: '2rem',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                }}
              />
            </picture>
            <h2 style={{
              margin: '0 0 2rem',
              fontSize: '2.8rem',
              background: 'linear-gradient(45deg, #ff4d4d, #ff9f4d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 8px rgba(255, 0, 0, 0.2)',
              animation: 'popIn 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
            }}>
              YOU LOSE!
            </h2>
            <button
              style={{
                background: 'linear-gradient(45deg, #ff4d4d, #ff8000)',
                color: 'white',
                border: 'none',
                padding: '1.2rem 3rem',
                borderRadius: '50px',
                fontSize: '1.3rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(255, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                margin: '0 auto',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(255, 0, 0, 0.4)'
                }
              }}
              onClick={handleReplay}
            >
              <i className="bi bi-arrow-repeat" style={{ fontSize: '1.4rem' }}></i>
              Play Again
            </button>
          </div>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes popIn {
              0% { transform: scale(0.7); opacity: 0; }
              80% { transform: scale(1.05); }
              100% { transform: scale(1); opacity: 1; }
            }
            @media (max-width: 480px) {
              div > h2 {
                font-size: 2.2rem !important;
              }
              img {
                width: 120px !important;
                height: 120px !important;
              }
              button {
                font-size: 1.1rem !important;
                padding: 1rem 2rem !important;
              }
            }
            @media (max-width: 360px) {
              div > h2 {
                font-size: 2rem !important;
              }
              img {
                width: 100px !important;
                height: 100px !important;
              }
            }
          `}</style>
        </div>
      );
    }

    return (
      <div className="input-group">
        <input
          ref={inputRef}
          className="guess-input"
          type="text"
          value={guess}
          onChange={handleInput}
          placeholder="____"
          disabled={isSubmitting}
          maxLength="4"
          inputMode="numeric"
          pattern="[0-9]*"
          style={{
            fontSize: '1.2rem',
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(0, 0, 0, 0.3)',
            color: 'white'
          }}
        />

        <button
          className="app-button check-button"
          onClick={checkOnServer}
          disabled={guess.length !== 4 || isSubmitting}
          tabIndex="-1"
          style={{
            background: 'linear-gradient(45deg, #00b4d8, #0077b6)',
            color: 'white',
            padding: '0.8rem 1.5rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            ':hover': {
              transform: 'translateY(-2px)'
            }
          }}
        >
          <i className="bi bi-search me-2"></i>
          {isSubmitting ? 'Checking...' : 'Check Guess'}
        </button>
      </div>
    );
  };

  return (
    <div className="current-guess">
      {renderContent()}
    </div>
  );
}
