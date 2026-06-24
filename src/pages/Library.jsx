import { useGameStore } from "../store/gameStore";

export default function Library() {
  const library = useGameStore((state) => state.library);
  const removeFromLibrary = useGameStore((state) => state.removeFromLibrary);

  return (
    <div className="page">
      <h2>Library</h2>

      <div className="game-grid">
        {library.length === 0 && <p>No games yet</p>}

        {library.map((game) => (
          <div className="game-card" key={game.id}>
            <h3>{game.title}</h3>
            <p>{game.genre}</p>
            <p>⭐ {game.rating}</p>

            <button onClick={() => removeFromLibrary(game.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}