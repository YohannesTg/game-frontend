const RootComponent = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasExistingInput, setHasExistingInput] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

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
      return <App chatId={chatId} userId={userId} userName={userName} />;
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
