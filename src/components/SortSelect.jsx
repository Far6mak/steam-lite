import { useGameStore } from "../store/gameStore";

export default function SortSelect() {
  const sortType = useGameStore((state) => state.sortType);
  const setSortType = useGameStore((state) => state.setSortType);

  return (
    <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
      <option value="none">No sort</option>
      <option value="priceAsc">Price ↑</option>
      <option value="priceDesc">Price ↓</option>
      <option value="ratingDesc">Rating ↓</option>
    </select>
  );
}