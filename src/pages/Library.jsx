import { useGameStore } from "../store/gameStore";

export default function Library() {
  const library = useGameStore((state) => state.library);
  const removeFromLibrary = useGameStore((state) => state.removeFromLibrary);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Library</h2>

      {library.length === 0 ? (
        <p>No games in library</p>
      ) : (
        library.map((game) => (
          <div key={game.id} style={{ marginBottom: "10px" }}>
            <span>{game.title}</span>

            <button
              onClick={() => removeFromLibrary(game.id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}