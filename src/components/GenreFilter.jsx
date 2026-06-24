import { useState, useRef, useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export default function GenreFilter() {
  const games = useGameStore((state) => state.games);
  const genreFilter = useGameStore((state) => state.genreFilter);
  const setGenreFilter = useGameStore((state) => state.setGenreFilter);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Собираем жанры
  const genres = [
    "All",
    ...Array.from(new Set(games.map((g) => g.genre)))
  ];

  // Закрываем при клике вне
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Текущий выбранный жанр (для отображения на кнопке)
  const currentLabel = genreFilter || "All";

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      <div
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLabel}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {genres.map((g) => (
            <li
              key={g}
              className={g === genreFilter ? "active" : ""}
              onClick={() => {
                setGenreFilter(g);
                setIsOpen(false);
              }}
            >
              {g}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}