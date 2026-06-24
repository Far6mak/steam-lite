import { useGameStore } from "../store/gameStore";

export default function GenreFilter() {
  const games = useGameStore((state) => state.games);
  const genreFilter = useGameStore((state) => state.genreFilter);
  const setGenreFilter = useGameStore((state) => state.setGenreFilter);

  // 🔥 автоматически собираем жанры
  const genres = [
    "All",
    ...Array.from(new Set(games.map((g) => g.genre)))
  ];

  return (
    <select
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
      style={{
        padding: "8px",
        marginLeft: "10px",
        borderRadius: "8px",
        background: "#0f172a",
        color: "white",
        border: "1px solid #1f2937",
      }}
    >
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  );
}