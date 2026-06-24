import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import { useGameStore } from "../store/gameStore";

export default function Store() {
  const games = useGameStore((state) => state.games);
  const searchQuery = useGameStore((state) => state.searchQuery);
  const genreFilter = useGameStore((state) => state.genreFilter);

  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((game) =>
      genreFilter === "All" ? true : game.genre === genreFilter
    );

  return (
    <div>
      <h2>Store</h2>

      <SearchBar />
      <GenreFilter />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}