import { useGameStore } from "../store/gameStore";

export default function GenreFilter() {
  const genreFilter = useGameStore((state) => state.genreFilter);
  const setGenreFilter = useGameStore((state) => state.setGenreFilter);

  const genres = ["All", "Action", "RPG", "Shooter", "Strategy", "Indie"];

  return (
    <select
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value)}
      style={{ padding: "8px", marginLeft: "10px" }}
    >
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  );
}