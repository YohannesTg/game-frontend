import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Target from './target';

const RootComponent = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasExistingInput, setHasExistingInput] = useState(false);

  useEffect(() => {
    const checkExistingGame = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const chatId = urlParams.get('chatId');
        const userId = urlParams.get('userId');

        if (chatId && userId) {
          const response = await fetch(`https://gamechecker.vercel.app/exist?chatId=${chatId}&userId=${userId}`);
          const data = await response.json();
          
          if (data.inputValue) {
            setHasExistingInput(true);
            return;
          }
        }
      } catch (error) {
        console.error('Error checking existing game:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingGame();
  }, []);

  const renderContent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameMode = urlParams.get('mode');

    if (hasExistingInput) {
      return <App />;
    }

    switch(gameMode) {
      case 'solo':
        return <App />;
      case 'multi':
        return <Target />;
      default:
        return (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            <h2>🚫 Invalid Access Method</h2>
            <p>Please launch the game through the Telegram bot using:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><code>?mode=solo</code> - Single Player Mode</li>
              <li><code>?mode=multi</code> - Multiplayer Mode</li>
            </ul>
          </div>
        );
    }
  };

  if (isChecking) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <p>Checking game status...</p>
      </div>
    );
  }

  return renderContent();
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
