import { useState, useRef, useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export default function SortSelect() {
  const sortType = useGameStore((state) => state.sortType);
  const setSortType = useGameStore((state) => state.setSortType);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "none", label: "No sort" },
    { value: "priceAsc", label: "Price ↑" },
    { value: "priceDesc", label: "Price ↓" },
    { value: "ratingDesc", label: "Rating ↓" },
  ];

  // Текущий выбранный вариант для отображения на кнопке
  const currentLabel = options.find((opt) => opt.value === sortType)?.label || "No sort";

  // Закрываем по клику вне
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{currentLabel}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={opt.value === sortType ? "active" : ""}
              onClick={() => {
                setSortType(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}