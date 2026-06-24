import { useState } from "react";
import { useGameStore } from "../store/gameStore";

export default function Library() {
  const library = useGameStore((state) => state.library);
  const removeFromLibrary = useGameStore((state) => state.removeFromLibrary);

  const [runningGames, setRunningGames] = useState([]);

  const toggleGame = (gameId) => {
    setRunningGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  return (
    <div className="page">
      <h2>Library</h2>

      {library.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Your library is empty</p>
      ) : (
        <div className="library-list">
          {library.map((game) => {
            const isRunning = runningGames.includes(game.id);

            return (
              <div className="library-item" key={game.id}>

                {/* LEFT SIDE: TEXT + PLAY */}
                <div className="library-left">
                  <div className="library-info">
                    <h3>{game.title}</h3>
                    <p>{game.genre}</p>
                    <p>⭐ {game.rating}</p>
                  </div>

                  <button
                    className={isRunning ? "play-btn running" : "play-btn"}
                    onClick={() => toggleGame(game.id)}
                  >
                    {isRunning ? "Close" : "Play"}
                  </button>
                </div>

                {/* RIGHT SIDE: REMOVE */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromLibrary(game.id)}
                >
                  Remove
                </button>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}