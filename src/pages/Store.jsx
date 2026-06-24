import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import { useGameStore } from "../store/gameStore";

export default function Store() {
  const games = useGameStore((state) => state.games);
  const searchQuery = useGameStore((state) => state.searchQuery);
  const genreFilter = useGameStore((state) => state.genreFilter);

  const filteredGames = games
    .filter((g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((g) =>
      genreFilter === "All" ? true : g.genre === genreFilter
    );

  return (
    <div className="page">
      <h2>Store</h2>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <SearchBar />
        <GenreFilter />
      </div>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}