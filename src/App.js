import React, { useState } from 'react';
import Header from './Header';
import Guess from './Guess';
import './App.css';

export default function App({ userName, chatId, userId }) {
  const [guesses, setGuesses] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  return (
    <div className="game-container">
      <Header
        userName={userName}
        score1={scores.player1}
        score2={scores.player2}
        trialNum={guesses.length}
        trial2={0}
      />

      <div className="game-board">
        <div className="hologram-display">
          {guesses.map((guess, index) => (
            <div key={index} className="guess-row">
              <span className="guess-number">{guess.number}</span>
              <div className="result-badges">
                <div className="bulls-badge">{guess.bulls}B</div>
                <div className="cows-badge">{guess.cows}C</div>
              </div>
            </div>
          ))}
        </div>

        <Guess
          onNewGuess={(guess, bulls, cows) => {
            setGuesses([...guesses, { number: guess, bulls, cows }]);
          }}
          setOpponent={() => {}}
          chatId={chatId}
          userId={userId}
        />
      </div>
    </div>
  );
}
