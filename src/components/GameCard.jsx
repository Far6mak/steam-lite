import { useGameStore } from "../store/gameStore";

export default function GameCard({ game }) {
  const addToLibrary = useGameStore((state) => state.addToLibrary);

  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} className="game-image" />

      <h3>{game.title}</h3>
      <p>🎮 {game.genre}</p>
      <p>💰 ${game.price}</p>
      <p>⭐ {game.rating}</p>

      <button onClick={() => addToLibrary(game)}>
        Add to Library
      </button>
    </div>
  );
}