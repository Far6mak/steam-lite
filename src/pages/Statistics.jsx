import { useGameStore } from "../store/gameStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Statistics() {
  const games = useGameStore((state) => state.games);
  const library = useGameStore((state) => state.library);

  // 🎯 считаем жанры
  const genreMap = {};

  games.forEach((g) => {
    genreMap[g.genre] = (genreMap[g.genre] || 0) + 1;
  });

  const genreData = Object.keys(genreMap).map((key) => ({
    genre: key,
    count: genreMap[key],
  }));

  // 🎯 рейтинг
  const avgRating =
    games.reduce((acc, g) => acc + g.rating, 0) / games.length;

  const ratingData = games.map((g) => ({
    name: g.title,
    rating: g.rating,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Statistics</h2>

      <p>📊 Total games: {games.length}</p>
      <p>📚 In library: {library.length}</p>
      <p>⭐ Average rating: {avgRating.toFixed(2)}</p>

      <h3>Games by genre</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={genreData}>
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3>Ratings</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={ratingData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rating" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}