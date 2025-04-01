:root {
  --primary-gradient: linear-gradient(45deg, #6ab7ff, #2575fc);
  --gold-gradient: linear-gradient(45deg, #ffd700, #ffaa00);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --modern-font: 'Inter', system-ui, -apple-system, sans-serif;
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  background: linear-gradient(45deg, #1a1a2e 0%, #16213e 100%);
  font-family: var(--modern-font);
  color: var(--text-primary);
  overflow-x: hidden;
}

/* ========== App Component Styles ========== */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(16, 18, 27, 0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
  width: 100%;
}

.player-info {
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.player-name {
  color: #6ab7ff;
  font-size: 1.2rem;
  font-weight: 600;
}

.opponent-name {
  color: #ff6b6b;
  font-size: 1.2rem;
  font-weight: 600;
}

.game-content {
  margin-top: 120px;
  padding: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.guess-history {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.guess-header,
.guess-item {
  display: grid;
  grid-template-columns: 1fr minmax(70px, auto) minmax(70px, auto);
  gap: 1rem;
  padding: 1rem;
  width: 100%;
}

.guess-header {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;
  color: #ffd700;
  font-weight: 600;
}

.guess-item {
  background: linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1));
  border-radius: 12px;
  margin-bottom: 1rem;
}

.guess-number {
  letter-spacing: 0.3rem;
  font-size: 1.1rem;
  font-family: 'Space Mono', monospace;
  color: #ffd700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-number {
  text-align: center;
  font-size: 1.2rem;
  padding: 4px 8px;
  border-radius: 8px;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-result {
  background: rgba(0, 255, 255, 0.15);
  color: #00ffff;
}

.o-result {
  background: rgba(0, 255, 0, 0.15);
  color: #76ff7a;
}

.replay-container {
  text-align: center;
  margin-top: 2rem;
}

/* ========== Target Page Styles ========== */
.target-container {
  padding: 2rem 1rem;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 4rem 0 2rem;
}

.text-gradient {
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin: 2rem auto;
  width: 100%;
  max-width: 800px;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.rule-card {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.rule-card:hover {
  transform: translateY(-5px);
}

.rule-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
  background: rgba(255, 255, 255, 0.1);
}

.secret-input {
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
  margin: 1rem auto;
}

/* ========== Responsive Design ========== */
@media (max-width: 768px) {
  .player-info {
    padding: 0 1rem;
  }

  .game-content {
    padding: 1rem;
    margin-top: 100px;
  }

  .guess-header,
  .guess-item {
    grid-template-columns: 1fr minmax(60px, auto) minmax(60px, auto);
    gap: 0.5rem;
    padding: 0.8rem;
  }

  .guess-number {
    font-size: 1rem;
    letter-spacing: 0.2rem;
  }

  .result-number {
    font-size: 1rem;
    min-width: 50px;
  }

  /* Target Page Mobile */
  .target-container {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 0 1rem;
  }

  .rules-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .glass-card {
    padding: 1.5rem;
    margin: 1rem auto;
  }

  .secret-input {
    font-size: 1.2rem;
    max-width: 250px;
    padding: 0.8rem;
  }
}

@media (max-width: 480px) {
  .player-name,
  .opponent-name {
    font-size: 1rem;
  }

  /* Target Page Mobile Small */
  .secret-input {
    font-size: 1rem;
    max-width: 200px;
    letter-spacing: 0.3rem;
  }

  .rule-card {
    padding: 1rem;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== Shared Components ========== */
.glow-button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: var(--gold-gradient);
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glow-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}
