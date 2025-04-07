import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Target from './target';

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const gameMode = urlParams.get('mode');

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Conditional rendering logic
const renderComponent = () => {
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

// Render the appropriate component
root.render(
  <React.StrictMode>
    {renderComponent()}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
