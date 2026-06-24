import { useGameStore } from "../store/gameStore";

export default function Library() {
  const library = useGameStore((state) => state.library);
  const removeFromLibrary = useGameStore((state) => state.removeFromLibrary);

  return (
    <div className="page">
      <h2>Library</h2>

      {library.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Your library is empty</p>
      ) : (
        <div className="library-list">
          {library.map((game) => (
            <div className="library-item" key={game.id}>
              <div className="library-info">
                <h3>{game.title}</h3>
                <p>{game.genre}</p>
                <p>⭐ {game.rating}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromLibrary(game.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}