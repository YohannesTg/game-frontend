import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Target from './target';

const RootComponent = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasExistingInput, setHasExistingInput] = useState(false);
  const [chatId, setChatId] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkExistingGame = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const chatIdParam = urlParams.get('chatId');
        const userIdParam = urlParams.get('userId');
        const userNameParam = urlParams.get('userName');

        setChatId(chatIdParam);
        setUserId(userIdParam);
        setUserName(userNameParam);

        if (chatIdParam && userIdParam) {
          const response = await fetch(`https://gamechecker.vercel.app/exist?chatId=${chatIdParam}&userId=${userIdParam}`);
          const data = await response.json();

          if (data.inputValue) {
            setHasExistingInput(true);
            setInputValue(data.inputValue);
            setShowPopup(true);  // Show the custom popup
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

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderContent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameMode = urlParams.get('mode');

    if (hasExistingInput) {
      return <App chatId={chatId} userId={userId} userName={userName} inputValue={inputValue} />;
    }

    switch (gameMode) {
      case 'solo':
        return <App chatId={chatId} userId={userId} userName={userName} />;
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'inline-block',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: '#00b4d8',
            animation: 'spin 1s ease-in-out infinite',
            marginBottom: '1.5rem'
          }}></div>
          <h2 style={{
            margin: '0',
            fontSize: '1.5rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            background: 'linear-gradient(45deg, #00b4d8, #90e0ef)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeInUp 0.5s ease-out'
          }}>
            Checking Game Status
          </h2>
          <p style={{
            marginTop: '0.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem',
            animation: 'fadeIn 0.5s ease-out 0.2s',
            animationFillMode: 'backwards'
          }}>
            Securely verifying your game session...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 1000,
        }}>
          <h3>Game Starter with previous code number {inputValue}</h3>
          <button onClick={closePopup} style={{
            background: '#ff4c4c',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Close</button>
        </div>
      )}
      {renderContent()}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
