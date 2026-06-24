import { useGameStore } from "../store/gameStore";

import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import SortSelect from "../components/SortSelect";

export default function Store() {
  const games = useGameStore((state) => state.games);

  const searchQuery = useGameStore((state) => state.searchQuery);
  const genreFilter = useGameStore((state) => state.genreFilter);
  const sortType = useGameStore((state) => state.sortType);

  // 🔎 фильтрация + сортировка (ОДИН РАЗ, без дублей)
  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((game) =>
      genreFilter === "All" ? true : game.genre === genreFilter
    )
    .sort((a, b) => {
      if (sortType === "priceAsc") return a.price - b.price;
      if (sortType === "priceDesc") return b.price - a.price;
      if (sortType === "ratingDesc") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="page">
      <h2>Store</h2>

      {/* 🔧 Панель управления */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <SearchBar />
        <GenreFilter />
        <SortSelect />
      </div>

      {/* 🎮 Игры */}
      <div className="game-grid">
        {filteredGames.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No games found</p>
        ) : (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        )}
      </div>
    </div>
  );
}