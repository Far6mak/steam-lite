import { useGameStore } from "../store/gameStore";

export default function GameCard({ game }) {
  const library = useGameStore((state) => state.library);
  const addToLibrary = useGameStore((state) => state.addToLibrary);

  const isInLibrary = library.some((g) => g.id === game.id);

  const handleClick = () => {
    if (!isInLibrary) {
      addToLibrary(game);
    }
  };

  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} className="game-image" />

      <h3>{game.title}</h3>
      <p>{game.genre}</p>
      <p>⭐ {game.rating}</p>
      <p>${game.price}</p>

      <button
        onClick={handleClick}
        disabled={isInLibrary}
        className={isInLibrary ? "in-library" : ""}
      >
        {isInLibrary ? "✔ In Library" : "Add to Library"}
      </button>
    </div>
  );
}