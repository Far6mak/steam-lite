import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";

export default function FeaturedGame() {
  const games = useGameStore((state) => state.games);
  const library = useGameStore((state) => state.library);
  const addToLibrary = useGameStore((state) => state.addToLibrary);

  const [current, setCurrent] = useState(null);
  const [fade, setFade] = useState(true);

  const isInLibrary = current
    ? library.some((g) => g.id === current.id)
    : false;

  const pickRandomGame = () => {
    if (!games.length) return;

    setFade(false);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * games.length);
      setCurrent(games[randomIndex]);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    pickRandomGame();
    const interval = setInterval(pickRandomGame, 30000);
    return () => clearInterval(interval);
  }, [games]);

  if (!current) return null;

  const handleClick = () => {
    if (!isInLibrary) {
      addToLibrary(current);
    }
  };

  return (
    <div className={`featured ${fade ? "fade-in" : "fade-out"}`}>

      {/* GIF CENTER */}
      <div className="featured-media-center">
        <img src={current.image} alt={current.title} />
      </div>

      {/* TEXT OVERLAY */}
      <div className="featured-overlay">
        <h2>🔥 Featured Game</h2>

        <h1>{current.title}</h1>

        <p>Genre: {current.genre}</p>
        <p>⭐ Rating: {current.rating}</p>
        <p>💰 ${current.price}</p>

        <button
          onClick={handleClick}
          disabled={isInLibrary}
          className={isInLibrary ? "in-library" : ""}
        >
          {isInLibrary ? "✔ In Library" : "Add to Library"}
        </button>
      </div>

    </div>
  );
}