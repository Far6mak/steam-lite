import { useGameStore } from "../store/gameStore";

export default function SearchBar() {
  const searchQuery = useGameStore((state) => state.searchQuery);
  const setSearchQuery = useGameStore((state) => state.setSearchQuery);

  return (
    <div style={{ marginBottom: "15px" }}>
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}